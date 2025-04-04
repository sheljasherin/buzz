import {
  Model,
  Transaction,
  Op,
  WhereOptions,
  DatabaseError,
  Includeable,
} from "sequelize";
import { MakeNullishOptional } from "sequelize/types/utils";

import { IQueryStringParams } from "@repo/types/lib/types";
import { IBaseAttributes } from "@repo/types/lib/types.sql";

import { getData, getDataArray } from "../utils/sequelize/sequelizeUtils";
import { generateSequelizeQuery } from "../utils/sequelize/generateSequelizeQuery";
import { ConflictError } from "../errors/ConflictError";
import { InternalServerError } from "../errors/InternalServerError";
import { IBaseRepository } from "./IBaseRepository";

export abstract class BaseRepository<T extends IBaseAttributes>
  implements IBaseRepository<T, string>
{
  protected model: typeof Model & (new () => Model<T>);

  protected getByIdIncludeable: Includeable[] = [];
  protected findOneIncludeable: Includeable[] = [];
  protected getAllIncludeable: Includeable[] = [];
  protected historyIncludeable: Includeable[] = [];

  protected constructor(model: typeof Model & (new () => Model<T, T>)) {
    this.model = model;
  }

  async getAll(query: IQueryStringParams): Promise<T[]> {
    const sequelizeQuery = generateSequelizeQuery(query, this.getSearchQuery);
    const whereOptions = sequelizeQuery?.where || {};

    const results = await this.model.findAll({
      include: this.getAllIncludeable.length
        ? this.getAllIncludeable
        : undefined,
      order: sequelizeQuery.order,
      where: {
        ...whereOptions,
      } as WhereOptions<T>,
    });
    return getDataArray(results);
  }

  async getAllWithCursor(
    query: IQueryStringParams,
    cursorComparison: "lt" | "gt" = "gt"
  ): Promise<{ items: T[]; nextCursor: number | null }> {
    const sequelizeQuery = generateSequelizeQuery(query, this.getSearchQuery);
    const whereOptions = sequelizeQuery?.where || {};

    if (query.cursor) {
      // Assuming cursor is a string representing an ID
      const cursorValue = query.cursor;
      // Modify the where clause to get results after the cursor value
      whereOptions[cursorComparison === "gt" ? Op.gt : Op.lt] = {
        id: cursorValue,
      }; // Adjust this according to your cursor logic
    }

    const results = await this.model.findAll({
      include: this.getAllIncludeable.length
        ? this.getAllIncludeable
        : undefined,
      order: sequelizeQuery.order,
      where: whereOptions as WhereOptions<T>,
      limit: query.limit, // Limit should still be applied
    });
    const items = getDataArray(results) as T[];

    const lastItem =
      items.length >= (query?.limit || 0) ? items[items.length - 1] : null;
    const nextCursor = lastItem ? lastItem.id : null;

    return {
      items,
      nextCursor: nextCursor || null,
    };
  }

  async getById<TWithDetails = T>(id: string): Promise<TWithDetails | null> {
    const response = await this.model.findByPk(id, {
      include: this.getByIdIncludeable.length
        ? this.getByIdIncludeable
        : undefined,
    });
    return response ? getData(response) : null;
  }

  async findOne(query: IQueryStringParams): Promise<T | null> {
    const results = await this.model.findOne({
      include: this.findOneIncludeable.length
        ? this.findOneIncludeable
        : undefined,
      ...generateSequelizeQuery(query, this.getSearchQuery),
    });

    if (!results) {
      return null;
    }
    return getData(results);
  }

  async create(data: T): Promise<T> {
    if (!data) {
      throw new Error("Invalid data");
    }
    const transaction: Transaction = await this.model.sequelize!.transaction();
    try {
      const response: Model<T> = await this.model.create(
        data as unknown as MakeNullishOptional<T>,
        {
          transaction,
        }
      );
      await transaction.commit();
      return getData(response);
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async update(
    id: string,
    data: Partial<T>,
    upsert?: boolean
  ): Promise<T | null> {
    const transaction: Transaction = await this.model.sequelize!.transaction();
    try {
      let entry = await this.model.findByPk(id, { transaction });
      if (!entry) {
        if (!upsert) {
          await transaction.rollback();
          throw new Error("Not Found");
        } else {
          const response = await this.create(data as T);
          await transaction.commit();

          return response;
        }
      }

      const updatedEntry = await entry.update(data, { transaction });
      await transaction.commit();
      return getData(updatedEntry);
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async updateMany(
    query: IQueryStringParams,
    updateData: Partial<T>
  ): Promise<void> {
    await this.model.update(updateData, {
      where: generateSequelizeQuery(query).where!,
    });
  }

  async delete(id: string): Promise<void> {
    const transaction: Transaction = await this.model.sequelize!.transaction();
    try {
      const entry = await this.model.findByPk(id);
      if (!entry) {
        throw new Error("Not Found");
      }

      await entry.destroy({ transaction });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      if (
        (error as DatabaseError).name === "SequelizeForeignKeyConstraintError"
      ) {
        throw new ConflictError(
          "Conflict: Unable to delete the resource as it is referenced by another resource."
        );
      }
      throw error;
    }
  }

  async bulkDelete(query: IQueryStringParams): Promise<void> {
    await this.model.destroy(generateSequelizeQuery(query));
  }

  async bulkCreate(data: MakeNullishOptional<T>[]): Promise<T[]> {
    if (!data || data.length === 0) {
      throw new Error("Invalid data");
    }
    const transaction: Transaction = await this.model.sequelize!.transaction();
    try {
      const responses = await this.model.bulkCreate(data, {
        transaction,
      });
      await transaction.commit();
      return getDataArray(responses);
    } catch (error) {
      await transaction.rollback();
      console.error(error);
      throw new InternalServerError();
    }
  }

  async bulkUpdate(data: (Partial<T> & { id: string })[]) {
    const transaction: Transaction = await this.model.sequelize!.transaction();
    try {
      const updatedEntries: T[] = [];

      for (const item of data) {
        const entry = await this.model.findByPk(item.id, { transaction });

        if (!entry) {
          throw new Error(`Not Found: ${item.id}`);
        }

        const updatedEntry = await entry.update(item, { transaction });
        updatedEntries.push(getData(updatedEntry));
      }
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  abstract getSearchQuery: (searchText: string) => WhereOptions<T>;
  
}

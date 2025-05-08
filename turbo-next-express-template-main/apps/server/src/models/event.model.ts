import { DataTypes, Model } from "sequelize";
import { sequelize } from "../helpers/sequelize";
import { IEvent } from "@repo/types/src/schema/event";

export class EventModel extends Model<IEvent> implements IEvent {
  public id!: number;
  public title!: string;
  public description!: string;
  public from_date!: string;
  public from_time!: string;
  public to_date!: string;
  public to_time!: string;
  public venue!: string;
  public location!: string;
  public category!: string;
  public price!: number;
  public organizer_id!: number;
  public status!: "Pending" | "Accepted" | "Rejected";
}

EventModel.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  from_date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  from_time: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  to_date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  to_time: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  venue: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  organizer_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("Pending", "Accepted", "Rejected"),
    allowNull: true,
    defaultValue: "Pending",
  },
}, {
  sequelize,
  tableName: "events",
  timestamps: true,
  underscored: true,
});

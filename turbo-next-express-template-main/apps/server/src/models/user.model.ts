import { DataTypes, Model } from "sequelize";
import { sequelize } from "../helpers/sequelize";
import { IUser } from "@repo/types/lib/schema/user";

export class UserModel extends Model<IUser> implements IUser {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public role!: "user" | "organizer" | "admin";
}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("user", "organizer", "admin"),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "usertable",
    timestamps: false,
    underscored: true,
  }
);

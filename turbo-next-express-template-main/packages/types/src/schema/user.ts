import { IBaseAttributes } from "../types.sql";
export interface IUser extends IBaseAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  role: "user" | "organizer" | "admin";
}

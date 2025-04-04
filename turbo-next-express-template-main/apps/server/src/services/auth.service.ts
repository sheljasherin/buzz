import User from "../models/user.models";
import bcrypt from "bcrypt";

export const registerUser = async (name: string, email: string, password: string, role: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return await User.create({ name, email, password: hashedPassword, role });
};

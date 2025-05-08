import { UserModel } from "../models/user.model";

export const authRepository = {
  findByEmail: async (email: string) => {
    return await UserModel.findOne({ where: { email } });
  },

  findById: async (id: number) => {
    return await UserModel.findByPk(id);
  },

  create: async (userData: { email: string; password: string; username: string; role: string }) => {
    return await UserModel.create(userData);
  },
};

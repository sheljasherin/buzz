import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { authRepository } from "../repositories/auth.repository";

export const authService = {
  signup: async (data: { email: string; password: string; username: string; role: string }) => {
    const existing = await authRepository.findByEmail(data.email);
    if (existing) throw new Error("User already exists");

    const hashed = await bcrypt.hash(data.password, 10);
    return await authRepository.create({ ...data, password: hashed });
  },

  login: async (email: string, password: string) => {
    const user = await authRepository.findByEmail(email);
    if (!user) throw new Error("Invalid credentials");

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error("Invalid credentials");

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    return { token, user };
  },

  getCurrentUser: async (id: number) => {
    const user = await authRepository.findById(id);
    if (!user) throw new Error("User not found");
    return user;
  },
};

import axios from "axios";
import { IUser } from "@repo/types/lib/schema/user";

export const authService = {
  signup: async (data: { email: string; password: string; username: string; role: string }) => {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_SERVER}/auth/signup`, data);
    return res.data.data;
  },

  login: async (data: { email: string; password: string }) => {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_SERVER}/auth/login`, data);
    localStorage.setItem("token", res.data.data.token);
    return res.data.data.user;
  },

  getCurrentUser: async (): Promise<IUser> => {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_SERVER}/auth/account`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.data;
  },
};

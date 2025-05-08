// apps/web/services/userServices.ts
import { IUser } from '@repo/types/lib/schema/user';
import { getHttp } from '../utils/getHttp';

const http = getHttp('/user'); // <--- SUSPECT THIS LINE

export const userServices = {
  getCurrentUser: async (): Promise<IUser | null> => {
    try {
      const response = await http.get<{ user: IUser }>('/me');
      return response.data.user;
    } catch (error) {
      console.error('Failed to fetch current user:', error);
      return null;
    }
  },
};
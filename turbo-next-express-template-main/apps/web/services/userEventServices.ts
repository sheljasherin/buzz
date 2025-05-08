import axios from 'axios';
import { IEvent } from '@repo/types/src/schema/event';

const API_URL = `${process.env.NEXT_PUBLIC_API_SERVER}/events`;

export const eventService = {
  async getAll(): Promise<IEvent[]> {
    const res = await axios.get(`${API_URL}`);
    return res.data.data;
  },

  async updateEventStatus(id: string, status: 'Accepted' | 'Rejected') {
    await axios.patch(`${API_URL}/${id}/status`, { status });
  }
};

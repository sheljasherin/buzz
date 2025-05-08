// userEvent.repository.ts
import { EventModel } from '../models/event.model';

export const UserEventRepository = {
  async getApprovedEvents() {
    return await EventModel.findAll({
      where: { status: 'Accepted' }
    });
  }
};

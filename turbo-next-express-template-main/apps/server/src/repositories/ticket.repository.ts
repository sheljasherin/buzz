import { TicketModel } from '../models/ticket.models';
import { TicketCreationAttributes } from '../models/ticket.models';

export const ticketRepository = {
  async create(data: TicketCreationAttributes) {
    return TicketModel.create(data);
  },
};

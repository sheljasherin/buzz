import { ticketRepository } from '../repositories/ticket.repository';

export const ticketService = {
  async bookTicket(data: any) {
    // Optional: validate data here if needed
    return ticketRepository.create(data);
  },
};

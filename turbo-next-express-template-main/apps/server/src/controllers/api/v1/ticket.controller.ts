import { Request, Response } from 'express';
import { ticketService } from '../../../services/ticket.service';

export const bookTicketController = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, event_id } = req.body;

    if (!name || !email || !phone || !event_id) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const ticket = await ticketService.bookTicket({ name, email, phone, event_id });
    return res.status(201).json({ message: 'Ticket booked successfully', data: ticket });
  } catch (error) {
    console.error('Booking error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

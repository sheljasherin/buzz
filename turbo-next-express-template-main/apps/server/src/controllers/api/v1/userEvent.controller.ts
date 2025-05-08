// src/controllers/api/v1/userEvent.controller.ts
import { Request, Response } from 'express';
import { UserEventService } from "../../../services/userEvent.service";

// userEvent.controller.ts
export const getUserEvents = async (req: Request, res: Response) => {
    try {
      const userEvents = await UserEventService.getApprovedEvents();
      return res.status(200).json(userEvents);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching user events', error });
    }
  };
  

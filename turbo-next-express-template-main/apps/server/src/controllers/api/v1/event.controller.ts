import { Request, Response } from "express";
import { eventService } from "../../../services/event.service";

const validStatuses = ["Pending", "Accepted", "Rejected"] as const;

export const eventController = {
  async create(req: Request, res: Response) {
    try {
      const event = await eventService.createEvent(req.body);
      res.status(201).json({ success: true, data: event });
    } catch (err: any) {
      console.error(" Event creation failed:", err.message);
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async list(req: Request, res: Response) {
    try {
      const events = await eventService.listEvents();
      res.status(200).json({ success: true, data: events });
    } catch (err: any) {
      console.error(" Failed to list events:", err.message);
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async listByOrganizer(req: Request, res: Response) {
    try {
      const organizer_id = Number(req.params.organizer_id);
      if (!organizer_id) {
        return res.status(400).json({ success: false, message: "Organizer ID is required." });
      }
      const events = await eventService.listOrganizerEvents(organizer_id);
      res.status(200).json({ success: true, data: events });
    } catch (err: any) {
      console.error(" Failed to fetch organizer's events:", err.message);
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async updateStatus(req: Request, res: Response) {
    try {
      const eventId = Number(req.params.id);
      const { status } = req.body;

      if (!validStatuses.includes(status)) {
        return res.status(400).json({ success: false, message: "Invalid status value." });
      }

      const updated = await eventService.updateEventStatus(eventId, status);

      if (!updated) {
        return res.status(404).json({ success: false, message: "Event not found." });
      }

      res.status(200).json({ success: true, data: updated });
    } catch (err: any) {
      console.error(" Failed to update event status:", err.message);
      res.status(500).json({ success: false, message: err.message });
    }
  },
  
  async updateEvent(req: Request, res: Response) {
    try {
      const eventId = Number(req.params.id);
      const updatedData = req.body;
  
      const updatedEvent = await eventService.updateEventDetails(eventId, updatedData);
      
      if (!updatedEvent) {
        return res.status(404).json({ success: false, message: "Event not found." });
      }
  
      res.status(200).json({ success: true, data: updatedEvent });
    } catch (err: any) {
      console.error(" Failed to update event:", err.message);
      res.status(500).json({ success: false, message: err.message });
    }
  }
  
};

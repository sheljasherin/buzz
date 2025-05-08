import { EventModel } from "../models/event.model";
import { IEvent } from "@repo/types/src/schema/event";

const validStatuses = ["Pending", "Accepted", "Rejected"] as const;
type EventStatus = (typeof validStatuses)[number];

export const eventRepository = {
  async create(data: Omit<IEvent, "id" | "status">): Promise<IEvent> {
    try {
      const event = await EventModel.create(data);
      return event.toJSON() as IEvent;
    } catch (error) {
      if (error instanceof Error) {
        console.error(" Database Error:", error.message);
        throw new Error("Failed to create event in the database.");
      }
      throw new Error("An unknown error occurred while creating the event.");
    }
  },

  async getAll(): Promise<IEvent[]> {
    try {
      const events = await EventModel.findAll();
      return events.map((event) => event.toJSON() as IEvent);
    } catch (error) {
      if (error instanceof Error) {
        console.error(" Database Error:", error.message);
        throw new Error("Failed to fetch events from the database.");
      }
      throw new Error("An unknown error occurred while fetching events.");
    }
  },

  async getByOrganizerId(organizerId: number): Promise<IEvent[]> {
    try {
      const events = await EventModel.findAll({
        where: { organizer_id: organizerId },
      });
      return events.map((event) => event.toJSON() as IEvent);
    } catch (error) {
      if (error instanceof Error) {
        console.error(" Database Error:", error.message);
        throw new Error("Failed to fetch organizer's events.");
      }
      throw new Error("An unknown error occurred while fetching events.");
    }
  },

  async updateStatus(eventId: number, status: EventStatus): Promise<IEvent | null> {
    try {
      const event = await EventModel.findByPk(eventId);
      if (!event) {
        throw new Error("Event not found.");
      }

      if (!validStatuses.includes(status)) {
        throw new Error("Invalid status.");
      }

      event.status = status;
      await event.save();
      return event.toJSON() as IEvent;
    } catch (error) {
      if (error instanceof Error) {
        console.error(" Database Error:", error.message);
        throw new Error("Failed to update event status.");
      }
      throw new Error("An unknown error occurred while updating event status.");
    }
  },
  async updateEvent(eventId: number, updatedData: Partial<IEvent>): Promise<IEvent | null> {
    try {
      const event = await EventModel.findByPk(eventId);
      if (!event) {
        throw new Error("Event not found.");
      }
  
      await event.update(updatedData); // Update the event with the provided data
      return event.toJSON() as IEvent;
    } catch (error) {
      if (error instanceof Error) {
        console.error("❌ Database Error:", error.message);
        throw new Error("Failed to update event in the database.");
      }
      throw new Error("An unknown error occurred while updating event.");
    }
  }
  
};

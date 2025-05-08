import { eventRepository } from "../repositories/event.repository";
import { IEvent } from "@repo/types/src/schema/event";

const validStatuses = ["Pending", "Accepted", "Rejected"] as const;
type EventStatus = (typeof validStatuses)[number];

export const eventService = {
  async createEvent(data: Omit<IEvent, "id" | "status">) {
    try {
      return await eventRepository.create(data);
    } catch (error) {
      if (error instanceof Error) {
        console.error(" Event Service Error:", error.message);
        throw new Error("Failed to create event.");
      }
      throw new Error("An unknown error occurred while creating the event.");
    }
  },

  async listEvents() {
    try {
      return await eventRepository.getAll();
    } catch (error) {
      if (error instanceof Error) {
        console.error(" Event Service Error:", error.message);
        throw new Error("Failed to fetch events.");
      }
      throw new Error("An unknown error occurred while fetching events.");
    }
  },

  async listOrganizerEvents(organizerId: number) {
    try {
      return await eventRepository.getByOrganizerId(organizerId);
    } catch (error) {
      if (error instanceof Error) {
        console.error(" Event Service Error:", error.message);
        throw new Error("Failed to fetch organizer's events.");
      }
      throw new Error("An unknown error occurred while fetching organizer's events.");
    }
  },

  async updateEventStatus(eventId: number, status: EventStatus) {
    try {
      return await eventRepository.updateStatus(eventId, status);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Event Service Error:", error.message);
        throw new Error("Failed to update event status.");
      }
      throw new Error("An unknown error occurred while updating event status.");
    }
  },
  async updateEventDetails(eventId: number, updatedData: Partial<IEvent>) {
    try {
      return await eventRepository.updateEvent(eventId, updatedData);
    } catch (error) {
      if (error instanceof Error) {
        console.error(" Event Service Error:", error.message);
        throw new Error("Failed to update event.");
      }
      throw new Error("An unknown error occurred while updating event.");
    }
  }
  
};

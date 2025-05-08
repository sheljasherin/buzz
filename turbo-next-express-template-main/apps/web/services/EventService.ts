// EventService.ts
import { AbstractServices } from './AbstractService';
import { IEvent } from '@repo/types/src/schema/event';
import { IQueryStringParams } from '@repo/types/lib/types'; // Adjust the path according to where it's located

class EventService extends AbstractServices<IEvent, IEvent, IEvent, IEvent, IEvent> {
  constructor() {
    super('/events'); 
  }
  // Method to submit a new event
  public async submitEvent(data: IEvent): Promise<IEvent> {
    try {
      console.log(' Submitting event data:', data);
      return await this.create(data); // Using the `create` method from AbstractServices
    } catch (error) {
      console.error('Event Service Error:', error);
      throw new Error('Failed to submit event.');
    }
  }

  // Method to update an event (for approval/rejection)
  public async updateEventStatus(id: string, status: 'Accepted' | 'Rejected'): Promise<IEvent> {
    try {
      console.log('📤 Updating event status for ID:', id, 'New Status:', status);
      return await this.update(id, { status }); // Update the status field of the event
    } catch (error) {
      console.error('Event Service Error:', error);
      throw new Error('Failed to update event status.');
    }
  }

  // Method to get all events
  public async getAllEvents(queryParams?: IQueryStringParams): Promise<IEvent[]> {
    try {
      return await this.getAll(queryParams); // Using the `getAll` method from AbstractServices
    } catch (error) {
      console.error('Event Service Error:', error);
      throw new Error('Failed to fetch events.');
    }
  }

  // Method to get an event by ID
  public async getEventById(id: string): Promise<IEvent> {
    try {
      return await this.getById(id); // Using the `getById` method from AbstractServices
    } catch (error) {
      console.error('Event Service Error:', error);
      throw new Error('Failed to fetch event.');
    }
  }

  // Method to delete an event
  public async deleteEvent(id: string): Promise<void> {
    try {
      await this.delete(id); // Using the `delete` method from AbstractServices
    } catch (error) {
      console.error('Event Service Error:', error);
      throw new Error('Failed to delete event.');
    }
  }
  public async updateEvent(id: string, data: IEvent): Promise<IEvent> {
    try {
      console.log('📤 Updating event data for ID:', id, 'Data:', data);
      return await this.update(id, data); // This uses the `update` method from AbstractServices
    } catch (error) {
      console.error('Event Service Error:', error);
      throw new Error('Failed to update event.');
    }
  } 

}

export const eventService = new EventService();

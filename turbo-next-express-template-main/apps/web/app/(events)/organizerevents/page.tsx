'use client';

import React, { useEffect, useState } from 'react';
import { eventService } from '../../../services/EventService';
import { IEvent } from '@repo/types/src/schema/event';

const OrganizerEventsPage = () => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingEvent, setEditingEvent] = useState<IEvent | null>(null);
  const [formData, setFormData] = useState<Partial<IEvent>>({});

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const organizerId = 1; // Replace with actual organizer ID from auth context
        const allEvents = await eventService.getAll();
        const filteredEvents = allEvents.filter(event => event.organizer_id === organizerId);
        setEvents(filteredEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleEditClick = (event: IEvent) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      from_date: event.from_date,
      from_time: event.from_time,
      to_date: event.to_date,
      to_time: event.to_time,
      venue: event.venue,
      location: event.location,
      category: event.category,
      price: event.price,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingEvent) {
      try {
        const completeEvent: IEvent = {
          ...editingEvent,
          ...formData,
        };

        const updatedEvent = await eventService.updateEvent(String(editingEvent.id), completeEvent);

        setEvents(prevEvents =>
          prevEvents.map(event =>
            event.id === editingEvent.id ? { ...event, ...updatedEvent } : event
          )
        );

        setEditingEvent(null);
        setFormData({});
      } catch (error) {
        console.error('Error updating event:', error);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Events</h1>

      {loading ? (
        <p>Loading...</p>
      ) : events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <div className="grid gap-4">
          {events.map(event => (
            <div key={event.id} className="border p-4 bg-white shadow rounded">
              <h2 className="text-xl font-semibold">{event.title}</h2>
              <p><strong>Description:</strong> {event.description}</p>
              <p><strong>From:</strong> {event.from_date} at {event.from_time}</p>
              <p><strong>To:</strong> {event.to_date} at {event.to_time}</p>
              <p><strong>Venue:</strong> {event.venue}</p>
              <p><strong>Location:</strong> {event.location}</p>
              <p><strong>Category:</strong> {event.category}</p>
              <p><strong>Price:</strong> ₹{event.price}</p>
              <p>
                <strong>Status:</strong>{' '}
                <span className={`font-medium ${
                  event.status === 'Pending' ? 'text-yellow-600' :
                  event.status === 'Accepted' ? 'text-green-600' :
                  'text-red-600'
                }`}>
                  {event.status}
                </span>
              </p>
              <button
                onClick={() => handleEditClick(event)}
                className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      )}

      {editingEvent && (
        <div className="mt-6 p-6 bg-white shadow-md rounded">
          <h2 className="text-xl font-semibold mb-4">Edit Event</h2>
          <form onSubmit={handleSubmit} className="grid gap-4">

            <input name="title" value={formData.title || ''} onChange={handleInputChange} placeholder="Title" className="border p-2 rounded" />
            <textarea name="description" value={formData.description || ''} onChange={handleInputChange} placeholder="Description" className="border p-2 rounded" />

            <input name="from_date" type="date" value={formData.from_date || ''} onChange={handleInputChange} className="border p-2 rounded" />
            <input name="from_time" type="time" value={formData.from_time || ''} onChange={handleInputChange} className="border p-2 rounded" />

            <input name="to_date" type="date" value={formData.to_date || ''} onChange={handleInputChange} className="border p-2 rounded" />
            <input name="to_time" type="time" value={formData.to_time || ''} onChange={handleInputChange} className="border p-2 rounded" />

            <input name="venue" value={formData.venue || ''} onChange={handleInputChange} placeholder="Venue" className="border p-2 rounded" />
            <input name="location" value={formData.location || ''} onChange={handleInputChange} placeholder="Location" className="border p-2 rounded" />
            <input name="category" value={formData.category || ''} onChange={handleInputChange} placeholder="Category" className="border p-2 rounded" />
            <input name="price" type="number" value={formData.price || ''} onChange={handleInputChange} placeholder="Price" className="border p-2 rounded" />

            <div className="flex gap-4">
              <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
                Save Changes
              </button>
              <button type="button" onClick={() => setEditingEvent(null)} className="bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default OrganizerEventsPage;

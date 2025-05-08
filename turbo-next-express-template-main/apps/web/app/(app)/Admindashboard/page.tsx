'use client';

import React, { useEffect, useState } from 'react';
import { eventService } from '../../../services/EventService';
import { IEvent } from '@repo/types/src/schema/event';

const validStatuses = ['Pending', 'Accepted', 'Rejected'] as const;
type EventStatus = (typeof validStatuses)[number];

const AdminEventsPage = () => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const allEvents = await eventService.getAll();
        setEvents(allEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Update the status to either 'Accepted' or 'Rejected', excluding 'Pending'.
  const updateEventStatus = async (eventId: number, status: 'Accepted' | 'Rejected') => {
    try {
      setUpdatingId(eventId);
      await eventService.updateEventStatus(String(eventId), status);
      setEvents(prevEvents =>
        prevEvents.map(event =>
          event.id === eventId ? { ...event, status } : event
        )
      );
    } catch (error) {
      console.error('Error updating event status:', error);
    } finally {
      setUpdatingId(null);
    }
  };
  

  return (
    <div className="max-w-5xl mx-auto my-6">
      <h1 className="text-3xl font-bold mb-6">Admin - Event Management</h1>

      {loading ? (
        <p>Loading events...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {events.map(event => (
            <div key={event.id} className="border p-4 rounded-lg shadow-md">
              <h2 className="font-semibold text-lg mb-2">{event.title}</h2>
              <p className="text-sm text-gray-700 mb-2">{event.description}</p>

              <div className="text-sm mb-2">
                <span className="font-semibold">Current Status: </span>
                <span
                  className={`inline-block px-2 py-1 rounded ${
                    event.status === 'Accepted'
                      ? 'bg-green-100 text-green-800'
                      : event.status === 'Rejected'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {event.status}
                </span>
              </div>

              <div className="text-sm mb-2">
                <span className="font-semibold">Event Date:</span> {event.from_date} at {event.from_time}
              </div>
              <div className="text-sm mb-2">
                <span className="font-semibold">Venue:</span> {event.venue}
              </div>
              <div className="text-sm mb-2">
                <span className="font-semibold">Location:</span> {event.location}
              </div>
              <div className="text-sm mb-2">
                <span className="font-semibold">Category:</span> {event.category}
              </div>
              <div className="text-sm mb-2">
                <span className="font-semibold">Price:</span> ₹{event.price}
              </div>

              <div className="flex space-x-2">
                {/* Approve button for Rejected events */}
                {event.status === 'Rejected' && (
                  <button
                    disabled={updatingId === event.id}
                    onClick={() => updateEventStatus(event.id, 'Accepted')}
                    className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Approve
                  </button>
                )}

                {/* Reject button for Accepted events */}
                {event.status === 'Accepted' && (
                  <button
                    disabled={updatingId === event.id}
                    onClick={() => updateEventStatus(event.id, 'Rejected')}
                    className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Reject
                  </button>
                )}

                {/* Both Approve and Reject buttons for Pending events */}
                {event.status === 'Pending' && (
                  <>
                    <button
                      disabled={updatingId === event.id}
                      onClick={() => updateEventStatus(event.id, 'Accepted')}
                      className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Approve
                    </button>
                    <button
                      disabled={updatingId === event.id}
                      onClick={() => updateEventStatus(event.id, 'Rejected')}
                      className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminEventsPage;

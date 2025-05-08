'use client';

import React, { useEffect, useState } from 'react';
import { eventService } from '../../../services/userEventServices';
import { IEvent } from '@repo/types/src/schema/event';
import { useRouter } from 'next/navigation';

const categories = ['All', 'Music', 'Tech', 'Art', 'Food', 'Sports'];

const UserEvents = () => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filterDate, setFilterDate] = useState('');
  const [filterLocation, setFilterLocation] = useState('');

  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const allEvents = await eventService.getAll();
        if (Array.isArray(allEvents)) {
          setEvents(allEvents);
          setFilteredEvents(allEvents);
        } else {
          console.error('Invalid response from eventService.getAll()', allEvents);
        }
      } catch (error: any) {
        console.error('Error fetching events:', error?.response?.data || error.message || error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    let filtered = [...events];

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(event => event.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.title?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterLocation) {
      filtered = filtered.filter(event =>
        event.location?.toLowerCase().includes(filterLocation.toLowerCase())
      );
    }

    if (filterDate) {
      filtered = filtered.filter(event => event.from_date === filterDate);
    }

    setFilteredEvents(filtered);
  }, [searchTerm, selectedCategory, filterDate, filterLocation, events]);

  return (
    <div className="max-w-6xl mx-auto my-8 px-4">
      <h1 className="text-3xl font-bold mb-4">Browse Events</h1>

      {/* Filter Controls */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          className="border px-3 py-2 rounded"
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search by title"
          className="border px-3 py-2 rounded w-48"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />

        <input
          type="date"
          className="border px-3 py-2 rounded"
          value={filterDate}
          onChange={e => setFilterDate(e.target.value)}
        />

        <input
          type="text"
          placeholder="Filter by location"
          className="border px-3 py-2 rounded w-48"
          value={filterLocation}
          onChange={e => setFilterLocation(e.target.value)}
        />
      </div>

      {loading ? (
        <p>Loading events...</p>
      ) : filteredEvents.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map(event => (
            <div key={event.id} className="border p-4 rounded-lg shadow-md">
              <h2 className="font-semibold text-lg mb-2">{event.title}</h2>
              <p className="text-sm text-gray-700 mb-2">{event.description}</p>

              <div className="text-sm mb-2">
                <span className="font-semibold">Category:</span> {event.category}
              </div>
              <div className="text-sm mb-2">
                <span className="font-semibold">Location:</span> {event.location}
              </div>

              <button
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
                onClick={() => setSelectedEvent(event)}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-3/4 sm:w-1/2 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">{selectedEvent.title}</h2>
            <p className="text-sm text-gray-700 mb-4">{selectedEvent.description}</p>

            <div className="text-sm mb-2">
              <span className="font-semibold">Category:</span> {selectedEvent.category}
            </div>
            <div className="text-sm mb-2">
              <span className="font-semibold">Location:</span> {selectedEvent.location}
            </div>
            <div className="text-sm mb-2">
              <span className="font-semibold">Date:</span> {selectedEvent.from_date} at {selectedEvent.from_time}
            </div>
            <div className="text-sm mb-2">
              <span className="font-semibold">Venue:</span> {selectedEvent.venue}
            </div>
            <div className="text-sm mb-2">
              <span className="font-semibold">Price:</span> ₹{selectedEvent.price}
            </div>

            <div className="mt-6 flex justify-end gap-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setSelectedEvent(null)}
              >
                Close
              </button>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded"
                onClick={() => {
                  if (selectedEvent) router.push(`/bookticket?id=${selectedEvent.id}`);
                }}
              >
                Book Ticket
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserEvents;

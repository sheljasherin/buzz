'use client';

import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { bookTicket } from '../../../services/ticketServices';

const BookTicketPage = () => {
  const searchParams = useSearchParams();
  const eventId = searchParams.get('id');

  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventId) return setError('Missing event ID.');

    setLoading(true);
    setError(null);

    try {
      await bookTicket({ ...form, event_id: Number(eventId) });
      setSubmitted(true);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Booking failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto my-10 p-6 bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-4">Book Your Ticket</h1>
      {submitted ? (
        <p className="text-green-600">Booking successful!</p>
      ) : (
        <>
          {error && <p className="text-red-600 mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              required
              value={form.phone}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded"
              disabled={loading}
            >
              {loading ? 'Booking...' : 'Book Ticket'}
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default BookTicketPage;

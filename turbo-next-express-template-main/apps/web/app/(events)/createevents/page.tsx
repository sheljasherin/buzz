'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import * as z from 'zod';
import { eventService } from '../../../services/EventService';

const eventSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  venue: z.string().min(1, 'Venue is required'),
  location: z.string().min(1, 'Location is required'),
  category: z.string().min(1, 'Category is required'),
  price: z.coerce.number().min(0, 'Price must be at least 0'),
  total_participants: z.coerce.number().min(1, 'Participants must be at least 1'),
});

type EventFormValues = z.infer<typeof eventSchema>;

const CreateEventPage = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: '',
      description: '',
      date: '',
      time: '',
      venue: '',
      location: '',
      category: '',
      price: 0,
      total_participants: 1,
    },
  });

  const router = useRouter();

  const onSubmit = async (data: EventFormValues) => {
    try {
      const payload = {
        ...data,
        from_date: data.date,
        from_time: data.time,
        to_date: data.date,
        to_time: data.time,
        organizer_id: 1, // Replace dynamically for logged-in user
        status: 'Pending' as "Pending",
      };

      await eventService.submitEvent(payload);
      router.push('/organizerevents');
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create Event</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-6 shadow rounded">
        {[
          { name: 'title', label: 'Title' },
          { name: 'description', label: 'Description', textarea: true },
          { name: 'date', label: 'Date', type: 'date' },
          { name: 'time', label: 'Time', type: 'time' },
          { name: 'venue', label: 'Venue' },
          { name: 'location', label: 'Location' },
          { name: 'category', label: 'Category' },
          { name: 'price', label: 'Price', type: 'number' },
          { name: 'total_participants', label: 'Total Participants', type: 'number' },
        ].map(({ name, label, textarea, type }) => (
          <div key={name} className="flex flex-col">
            <label className="font-medium">{label}</label>
            <Controller
              name={name as keyof EventFormValues}
              control={control}
              render={({ field }) =>
                textarea ? (
                  <textarea {...field} className="border p-2 rounded" />
                ) : (
                  <input {...field} type={type} className="border p-2 rounded" />
                )
              }
            />
            {errors[name as keyof EventFormValues] && (
              <p className="text-red-500 text-sm">{errors[name as keyof EventFormValues]?.message}</p>
            )}
          </div>
        ))}
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateEventPage;

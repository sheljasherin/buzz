// 'use client';

// import { useSearchParams } from 'next/navigation';
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// interface Ticket {
//   id: number;
//   name: string;
//   email: string;
//   phone: string;
//   event_id: number;
//   createdAt: string;
// }

// const TicketListPage = () => {
//   const searchParams = useSearchParams();
//   const eventId = searchParams.get('id');

//   const [tickets, setTickets] = useState<Ticket[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchTickets = async () => {
//       if (!eventId) return;

//       setLoading(true);
//       try {
//         const res = await axios.get(
//           `${process.env.NEXT_PUBLIC_API_SERVER}/api/v1/tickets?event_id=${eventId}`
//         );
//         setTickets(res.data.data);
//       } catch (err: any) {
//         setError(err.response?.data?.message || 'Error fetching tickets');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTickets();
//   }, [eventId]);

//   return (
//     <div className="max-w-2xl mx-auto my-10 p-6 bg-white shadow rounded">
//       <h1 className="text-2xl font-bold mb-4">Booked Tickets</h1>
//       {loading && <p>Loading...</p>}
//       {error && <p className="text-red-600">{error}</p>}
//       {!loading && !error && (
//         <>
//           <p className="mb-4 text-gray-700">
//             Total Bookings: <strong>{tickets.length}</strong>
//           </p>
//           <ul className="space-y-3">
//             {tickets.map((ticket) => (
//               <li key={ticket.id} className="border px-4 py-2 rounded">
//                 <p><strong>Name:</strong> {ticket.name}</p>
//                 <p><strong>Email:</strong> {ticket.email}</p>
//                 <p><strong>Phone:</strong> {ticket.phone}</p>
//               </li>
//             ))}
//           </ul>
//         </>
//       )}
//     </div>
//   );
// };

// export default TicketListPage;

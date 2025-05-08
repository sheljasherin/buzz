export interface TicketPayload {
    name: string;
    email: string;
    phone: string;
    event_id: number;
  }
  
  export const bookTicket = async (payload: TicketPayload) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/tickets/book`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Failed to book ticket');
    }
  
    return res.json(); // Returns confirmation or ticket data
  };
  
  
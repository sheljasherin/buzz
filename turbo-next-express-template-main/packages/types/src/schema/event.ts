// packages/types/src/schema/event.ts

import { IBaseAttributes } from "../types.sql";

export interface IEvent extends IBaseAttributes {
  title: string;
  description: string;
  from_date: string;
  from_time: string;
  to_date: string;
  to_time: string;
  venue: string;
  location: string;
  category: string;
  price: number;
  organizer_id: number;
  status?: "Pending" | "Accepted" | "Rejected"; // Optional status field with specific union type
  message?: string; 
}

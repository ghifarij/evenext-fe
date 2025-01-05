import { IEvent } from "./event";

export interface ITicket {
  id: number;
  category: "Free" | "EarlyBird" | "Regular" | "VIP";
  seats: number;
  price: number;
  createdAt: string;
  eventId: number;
  event: IEvent;
}

export interface TicketInput {
  category: "Free" | "EarlyBird" | "Regular" | "VIP";
  seats: number;
  price: number;
}

import { IEvent } from "./event";

export interface ITicket {
  id: number;
  category: "Free" | "EarlyBird" | "Regular" | "VIP";
  seats: number;
  price: number;
  isFree: boolean;
  createdAt: string;
  eventId: number;
  event: IEvent;
}

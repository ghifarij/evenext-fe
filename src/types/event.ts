import { ITicket } from "./ticket";

export interface IPromotor {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
  isVerify: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IEvent {
  id: number;
  title: string;
  slug: string;
  thumbnail: string;
  description: string;
  terms: string;
  category: "Konser" | "Seminar" | "Olaharaga" | "Expo";
  location: "Bandung" | "Jakarta" | "Surabaya" | "Bali";
  venue: string;
  date: string;
  time: string;
  createdAt: string;
  promotorId: string;
  promotor: IPromotor;
  ticket: ITicket;
}

export interface EventInput {
  thumbnail?: File | string | null;
  title: string;
  date: string;
  time: string;
  location: string;
  venue: string;
  category: string;
  description: string;
  terms: string;
}

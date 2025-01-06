import { ITicket } from "./ticket";
import { IUser } from "./user";

export interface IPromotor {
  id: string;
  username: string;
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
  status: "active" | "finish";
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
  slug: string;
  date: string;
  time: string;
  location: string;
  venue: string;
  category: string;
  description: string;
  terms: string;
}
export type UserType = "user" | "promotor";

export interface SessionContext {
  isAuth: boolean;
  type: UserType | null;
  user: IUser | null;
  promotor: IPromotor | null;
  checkSession: () => Promise<void>;
  logout: () => void;
  loading: boolean;
}

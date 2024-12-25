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
  venue: string;
  date: string;
  time: string;
  createdAt: string;
  promotorId: string;
  promotor: IPromotor;
  ticket: ITicket;
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

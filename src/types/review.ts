import { IUser } from "./user";

export interface IReview {
  rating: number;
  description: string;
  createdAt: string;
  user: IUser;
}

export interface FormReview {
  rating: number;
  description: string;
}

import { IEvent } from "./event";
import { IOrder } from "./order";


export interface IUser {
  id: string;
  username: string;
  email: string;
  password: string;
  avatar: string;
  ref_code: string;
  isVerify: boolean;
  createdAt: string;
  updatedAt: string;
  User_Point: IUserPoint[];
  User_Coupon: IUserCoupon[];
  order: IOrder;
  review: IReview;
}

export interface IUserPoint {
  id: number;
  point: number;
  createdAt: string;
  expiredAt: string;
  isRedeem: boolean;
  userId: string;
  user: IUser;
}

export interface IUserCoupon {
  id: number;
  isRedeem: boolean;
  createdAt: string;
  expiredAt: string;
  userId: string;
  user: IUser;
}

export interface IReview {
  id: number;
  description: string;
  rating: number;
  userId: string;
  eventId: number;
  user: IUser;
  event: IEvent;
}

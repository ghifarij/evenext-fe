// import { Document } from "@contentful/rich-text-types";

export interface IUser {
  username: string;
  email: string;
  avatar: string;
  role: "User" | "Promotor";
}

export interface IEvent {
  id: string;
//   title: string;
//   thumbnail: string;
//   category: string;
//   slug: string;
// //   content: Document;
//   createdAt: string;
  user: IUser;
}
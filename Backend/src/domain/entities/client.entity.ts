import { Types } from "mongoose";

export interface Client {
  _id?: Types.ObjectId;

  name: string;
  email: string;

  password?: string;               
  googleId?: string;               
  authProvider: "local" | "google"; 

  phone?: string;
  role: "client" | "admin";                  
  profileImage?: string;

  isBlocked?: boolean;
  isSubscribed?: boolean;
  freeJobsCount?: number;
  stripeSubscriptionId?: string;
  subscriptionExpiryDate?: Date;

  createdAt?: Date;
}
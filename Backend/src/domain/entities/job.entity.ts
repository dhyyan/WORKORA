import { Types } from "mongoose";

export interface Job {
    _id?: Types.ObjectId;
    clientId: Types.ObjectId ;  // from logged-in client
    freelancerId?:Types.ObjectId,
    title: string;
    summary: string;
    features?: string[];
    category: string;
    duration: string;
    deadline: string;
    price: number;

    status?: "open" | "assigned" | "closed";

    createdAt?: string;
}
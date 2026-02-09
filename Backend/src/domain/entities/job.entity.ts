import { Types } from "mongoose";

export interface Job {
    _id?: string;
    clientId: Types.ObjectId ;  // from logged-in client

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
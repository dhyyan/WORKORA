import { Types } from "mongoose";

export interface Bid {
    _id?: string,
    jobId: string,
    freelancerId: Types.ObjectId,
    coverLetter: string,
    bidAmount: number,
    // deadline: string,
    status?: "pending" | "accepted" | "rejected",
    createdAt?: Date,
}
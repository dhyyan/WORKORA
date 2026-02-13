import { Types } from "mongoose";

export interface Bid {
    _id?: Types.ObjectId,
    jobId: Types.ObjectId,
    freelancerId: Types.ObjectId,
    coverLetter: string,
    bidAmount: number,
    // deadline: string,
    status?: "pending" | "accepted" | "rejected",
    createdAt?: Date,
}
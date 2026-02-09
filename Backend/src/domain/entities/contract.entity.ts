import { Types } from "mongoose";

export interface IContract {
    _id?: string,
    jobId: string,
    freelancerId: Types.ObjectId,
    totalAmount: number,
    status?: "active" | "completed" | "cancelled",
    createdAt?: Date,
}
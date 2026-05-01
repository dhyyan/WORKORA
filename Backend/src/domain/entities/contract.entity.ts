import { Types } from "mongoose";

export interface IContract {
    _id?: Types.ObjectId,
    jobId: Types.ObjectId,
    freelancerId: Types.ObjectId,
    totalAmount: number,
    status?: "active" | "completed" | "cancelled",
    createdAt?: Date,
}
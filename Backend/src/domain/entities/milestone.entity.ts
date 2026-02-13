import { Types } from "mongoose";

export interface IMilestone {
    _id?: Types.ObjectId,
    contractId: Types.ObjectId,
    title: string,
    amount: number,
    status?: "pending" | "funded" | "submited" |"released" | "approved",
    createdAt?: Date,
}   
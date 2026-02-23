import { Types } from "mongoose";

export interface IMilestone {
    _id?: Types.ObjectId,
    contractId: Types.ObjectId,
    title: string,
    amount: number,
    description:string,
    taskUrl:string,
    reason:string
    status?: "pending" | "funded" | "submited" |"released" | "rejected" | "approved" | "locked" | "refunded",
    createdAt?: Date,
}   
import { Types } from "mongoose";

export interface Escrow{
    _id?:Types.ObjectId,
    milestoneId:Types.ObjectId,
    amount:number,
    status?:"locked" | "released" | "refunded",
    createdAt?: Date,
}
import { Types } from "mongoose";

export interface IConcern {
    _id?: Types.ObjectId;
    contractId: Types.ObjectId;
    milestoneId: Types.ObjectId;
    amount: number
    description: string;
    status: string
    createdAt?: Date;
}
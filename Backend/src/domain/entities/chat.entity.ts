import { Types } from "mongoose";

export interface IChat {
    clientId: Types.ObjectId,
    freelancerId: Types.ObjectId,
    lastMessage: string,
    lastMessageAt?: Date,
}
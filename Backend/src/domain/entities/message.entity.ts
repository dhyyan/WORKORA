import { Types } from "mongoose";

export interface IMessage {
    _id?: Types.ObjectId;
    roomId: string;
    senderId: Types.ObjectId;
    receiverId: Types.ObjectId;
    text: string;
    isRead?: boolean;
    createdAt?: Date;
}

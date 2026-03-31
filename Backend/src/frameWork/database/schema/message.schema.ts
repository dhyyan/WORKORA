import { Schema } from "mongoose";
import { IMessage } from "../../../domain/entities/message.entity";

export const messageSchema= new Schema<IMessage>({
    roomId: { type: String,required: true },
    senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    receiverId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
    isRead: { type: Boolean, default: false },
}, { timestamps: true })
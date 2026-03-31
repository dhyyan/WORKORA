import { Document, model, ObjectId } from "mongoose";
import { IChat } from "../../../domain/entities/chat.entity";
import { chatSchema } from "../schema/chat.schema";

export interface IChatModel extends Omit<IChat, '_id'>, Document {
    _id: ObjectId
}

export const chatModel = model<IChat>('Chat', chatSchema)

import { model, ObjectId } from "mongoose";
import { IMessage } from "../../../domain/entities/message.entity";
import { messageSchema } from "../schema/message.schema";

export interface IMessageModel extends Omit<IMessage, '_id'>, Document {
    _id: ObjectId
}

export const messageModel= model<IMessage>('Message', messageSchema)
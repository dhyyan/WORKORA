import { IMessage } from "../../entities/message.entity";
import { IBaseRepository } from "./IBaseRepository";

export interface IMessageRepository extends IBaseRepository<IMessage> {
    markAsRead(roomId: string, userId: string): Promise<void>;
}
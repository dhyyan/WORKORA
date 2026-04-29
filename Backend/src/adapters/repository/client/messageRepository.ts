import { IMessage } from "../../../domain/entities/message.entity";
import { IMessageRepository } from "../../../domain/interface/repositoryInterface/IMessageRepository";
import { messageModel } from "../../../frameWork/database/models/message.models";
import { BaseRepository } from "../BaseRepo/baseRepository";

export class MessageRepository extends BaseRepository<IMessage> implements IMessageRepository{
    constructor(){
        super(messageModel)
    }

    async markAsRead(roomId: string, userId: string): Promise<void> {
        await messageModel.updateMany(
            { roomId, receiverId: userId, isRead: false },
            { $set: { isRead: true } }
        );
    }
}
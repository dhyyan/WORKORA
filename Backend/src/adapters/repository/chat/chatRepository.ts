import { Types } from "mongoose";
import { IChat } from "../../../domain/entities/chat.entity";
import { IChatRepository } from "../../../domain/interface/repositoryInterface/IChatRepository";
import { chatModel } from "../../../frameWork/database/models/chat.model";
import { BaseRepository } from "../BaseRepo/baseRepository";

export class ChatRepository extends BaseRepository<IChat> implements IChatRepository {
    constructor(){
        super(chatModel)
    }
    async findUserChats(id: Types.ObjectId): Promise<IChat[]> {
        return chatModel.find({
            $or: [
                { clientId: id },
                { freelancerId: id }
            ]
        })
        .populate("clientId", "name email profileImage")
        .populate("freelancerId", "name email profileImage");
    }
}
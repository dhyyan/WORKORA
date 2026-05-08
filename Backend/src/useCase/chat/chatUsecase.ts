import { IGetChatUsersInput, IGetChatUsersOutput, IGetMessageInput, IGetMessageOutput, ISaveMessageInput, ISaveMessageOutput } from "../../domain/interface/DTOs/chat/chatDtos";
import { IChatRepository } from "../../domain/interface/repositoryInterface/IChatRepository";
import { IMessageRepository } from "../../domain/interface/repositoryInterface/IMessageRepository";
import { IChatUseCase } from "../../domain/interface/useCaseInterface/chat/IChatUseCase";

export class ChatUsecase implements IChatUseCase {
    private _messageRepository: IMessageRepository
    private _chatRepository: IChatRepository
    constructor(messageRepository: IMessageRepository, chatRepository: IChatRepository) {
        this._messageRepository = messageRepository
        this._chatRepository = chatRepository
    }
    
    async saveMessage(input: ISaveMessageInput): Promise<ISaveMessageOutput> {
        console.log("Saving message with input:", input)
        const message = await this._messageRepository.create({ ...input.input })
        return { message }
    }

    
    async getMessage(input: IGetMessageInput): Promise<IGetMessageOutput> {
        const messages = await this._messageRepository.findAll({
            roomId: input.roomId
        })
        return { messages }
    }
    
    async getChatUsersClient(input: IGetChatUsersInput): Promise<IGetChatUsersOutput> {
        const users = await this._chatRepository.findUserChats(input.userId);
        return { users };
    }

    async getChatUsers(input: IGetChatUsersInput): Promise<IGetChatUsersOutput> {
        const listChatUsers = await this._chatRepository.findUserChats(input.userId)
        return { users: listChatUsers }
    }

    async markMessagesAsRead(roomId: string, userId: string): Promise<void> {
        await this._messageRepository.markAsRead(roomId, userId);
    }
}
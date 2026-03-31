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
        try {
            console.log("Saving message with input:", input)
            // const chatRoom=await this._messageRepository.findById(input.input.roomId)
            // if(!chatRoom){
            //     throw new Error("Chat room not found")
            // }
            const message = await this._messageRepository.create({ ...input.input })
            return { message }
        } catch (error) {
            throw error
        }
    }

    
    async getMessage(input: IGetMessageInput): Promise<IGetMessageOutput> {

        try {
            const messages = await this._messageRepository.findAll({
                roomId: input.roomId
            })
            return { messages }
        } catch (error) {
            throw error
        }

    }
    
    async getChatUsersClient(input: IGetChatUsersInput): Promise<IGetChatUsersOutput> {
        try {
            const users = await this._chatRepository.findUserChats(input.userId);
            console.log("Chat users fetched for client:", users);
            return { users };
        } catch (error) {
            throw error;
        }
    }

    async getChatUsers(input: IGetChatUsersInput): Promise<IGetChatUsersOutput> {
        try {

            const listChatUsers = await this._chatRepository.findUserChats(input.userId)
            console.log("List of chat users fetched from repository:", listChatUsers)
            return { users: listChatUsers }
        } catch (error) {
            throw error
        }
    }


}
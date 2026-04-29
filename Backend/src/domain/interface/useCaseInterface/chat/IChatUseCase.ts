import { IGetChatUsersInput, IGetChatUsersOutput, IGetMessageInput, IGetMessageOutput, ISaveMessageInput, ISaveMessageOutput } from "../../DTOs/chat/chatDtos";

export interface IChatUseCase{
    getMessage(input:IGetMessageInput):Promise<IGetMessageOutput>
    saveMessage(input:ISaveMessageInput):Promise<ISaveMessageOutput>
    getChatUsers(input:IGetChatUsersInput):Promise<IGetChatUsersOutput>
    getChatUsersClient(input:IGetChatUsersInput):Promise<IGetChatUsersOutput>
    markMessagesAsRead(roomId: string, userId: string): Promise<void>
}
import { ChatController } from "../../adapters/controllers/chat/chatController";
import { ChatRepository } from "../../adapters/repository/chat/chatRepository";
import { MessageRepository } from "../../adapters/repository/client/messageRepository";
import { ChatUsecase } from "../../useCase/chat/chatUsecase";

 const messageRepository=new MessageRepository()
 const chatRepository=new ChatRepository()

 const chatUsecase=new ChatUsecase(messageRepository,chatRepository)
export const chatController= new ChatController(chatUsecase)    
import { Types } from "mongoose";
import { IChat } from "../../entities/chat.entity";
import { IBaseRepository } from "./IBaseRepository";

export interface IChatRepository extends IBaseRepository<IChat>{
    findUserChats(id:Types.ObjectId):Promise<IChat[]>
}
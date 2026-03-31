import { Request, Response } from "express";
import { IChatUseCase } from "../../../domain/interface/useCaseInterface/chat/IChatUseCase";
import { Types } from "mongoose";
import { HttpStatus } from "../../../domain/entities/httpStatus";

export class ChatController {
    private _chatUsecase:IChatUseCase
 constructor(chatUsecase:IChatUseCase){
    this._chatUsecase = chatUsecase
 }   
    async getChatHistory(req:Request,res:Response):Promise<void>{
        try {
            const roomId = req.params.roomid
            const response = await this._chatUsecase.getMessage({roomId}) 
            if(!response){
                res.status(HttpStatus.NOT_FOUND).json({message:"No messages found"})
            }
            res.status(HttpStatus.OK).json({message:"Messages fetched successfully",data:response})
        } catch (error) {
            console.log(error)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:"Internal server error"})
        } 
    }
    async getChatUsers(req:Request,res:Response):Promise<void>{
        try {
            console.log("Raw userId received in chat users route:", req.params.userId);
            if (!Types.ObjectId.isValid(req.params.userId)) {
                 res.status(HttpStatus.BAD_REQUEST).json({message: "Invalid User ID format"})
                 return;
            }
            const userId = new Types.ObjectId(req.params.userId)
            console.log("Casted userId in get chat users:", userId)
            const response = await this._chatUsecase.getChatUsers({userId}) 
            console.log("Response from chat usecase getChatUsers:", response)
            if(!response){
                res.status(HttpStatus.NOT_FOUND).json({message:"No users found"})
            }
            res.status(HttpStatus.OK).json({message:"Users fetched successfully",data:response})
        } catch (error) {
            console.log(error)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:"Internal server error"})
        }
    }
}
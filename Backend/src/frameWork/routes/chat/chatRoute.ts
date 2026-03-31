import { Request, Response, Router } from "express";
import { chatController } from "../../DI/chatInject";

export class ChatRoute {
    public chatRoutes: Router
    constructor() {
        this.chatRoutes = Router()
        this._setupRoutes()
    }

    private _setupRoutes() {
        this.chatRoutes.get("/message/:roomid/history",(req:Request,res:Response)=>{
            chatController.getChatHistory(req,res)
        })
        this.chatRoutes.get("/list/users/:userId",(req:Request,res:Response)=>{
            chatController.getChatUsers(req,res)
        })
    }
}
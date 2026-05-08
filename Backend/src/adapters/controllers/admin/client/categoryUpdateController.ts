import { Request, Response } from "express";

export class CategoryUpdateController{

    constructor(){
        
    }
    async list(req:Request,res:Response):Promise<void>{
        try {
            res.status(501).json({ message: "Not implemented" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}
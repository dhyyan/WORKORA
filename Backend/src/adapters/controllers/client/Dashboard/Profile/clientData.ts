import { Request, Response } from "express";
import { IClientDataUseCase } from "../../../../../domain/interface/useCaseInterface/client/Dashboard/Profile/iclientDataUseCase";
import { HttpStatus } from "../../../../../domain/entities/httpStatus";
import { Types } from "mongoose";

export class ClientDataController{
    private _clientDataUseCase:IClientDataUseCase
    constructor(clientDataUseCase:IClientDataUseCase){
        this._clientDataUseCase=clientDataUseCase
    }
    async data(req:Request,res:Response):Promise<void>{
        try {
            console.log("loooo")
            const userId = new Types.ObjectId(req.params.userId);

            const {client,success}=await this._clientDataUseCase.fetchData({userId})
            if(!client){
                res.status(HttpStatus.FORBIDDEN).json({message:"user not fect"})
            }
            res.status(HttpStatus.OK).json({message:"user fetch success",data:client})
            
        } catch (error) {
              res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({ message: "something went wrong" });
        }
    }
}
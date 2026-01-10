import { Request, Response } from "express";
import { HttpStatus } from "../../../../domain/entities/httpStatus";
import { IClientListUseCase } from "../../../../domain/interface/useCaseInterface/admin/client/clientListUseCase";

export class ClientListController{

    private _clientListUseCase:IClientListUseCase
    constructor(clientListUseCase:IClientListUseCase){
        this._clientListUseCase=clientListUseCase
    }
   async listUser(req:Request,res:Response){
        try {
          const users=await this._clientListUseCase.listclients({})
          console.log("users datas from controller",users)
          if(users){
            res.status(HttpStatus.OK).json({message:"user datas fetched success"})
          }
        } catch (error) {
            
        }
    }
}
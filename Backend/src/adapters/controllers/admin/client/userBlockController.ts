import { Request, Response } from "express";
import { IBlockUserUSeCase } from "../../../../domain/interface/useCaseInterface/admin/client/blockUserUseCase";
import { HttpStatus } from "../../../../domain/entities/httpStatus";
import { Types } from "mongoose";

export class UserBlockController{
    private _userBlockUseCase:IBlockUserUSeCase
    constructor(userBlockUseCase:IBlockUserUSeCase){
        this._userBlockUseCase=userBlockUseCase
    }

    async block(req:Request,res:Response):Promise<void>{
        try {
            const id= new Types.ObjectId(req.params.id);
            const {isBlocked}=req.body
            const block=isBlocked
            console.log("id controll",id,block)


            const update=await this._userBlockUseCase.block({id,isBlocked})
            if(update){
                res.status(HttpStatus.OK).json({message:"user block succes"})
            }else{
                res.status(HttpStatus.NOT_FOUND).json({message:"user block failed"})
            }
        } catch (error) {
            console.log(error)
        }
    }
}
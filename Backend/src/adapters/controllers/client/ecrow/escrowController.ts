import { Request, Response } from "express";
import { IEscrowFundUseCase } from "../../../../domain/interface/useCaseInterface/client/escrow/iEscrowFundUseCase";
import { HttpStatus } from "../../../../domain/entities/httpStatus";
import { Types } from "mongoose";

export class EscrowFundController{

    private _escrowFundUseCase:IEscrowFundUseCase
    constructor(escrowFundUseCase:IEscrowFundUseCase){
        this._escrowFundUseCase=escrowFundUseCase
    }

    async fundMilestone(req:Request,res:Response):Promise<void>{
        try {
            const id=new Types.ObjectId(req.params.milestoneId)
            const result=await this._escrowFundUseCase.createEscrow({id})
            if(!result)res.status(HttpStatus.BAD_REQUEST).json({message:"Failed to fund milestone"})  
                res.status(HttpStatus.OK).json({message:"Milestone funded successfully",data:result.escrow}) 
        } catch (error:any) {
            console.log("error in escrow fund controller",error)
        }
    }
}
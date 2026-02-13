import { Request, Response } from "express";
import { IJobContractUseCase } from "../../../../domain/interface/useCaseInterface/client/jobs/iJobContractUseCase";
import { HttpStatus } from "../../../../domain/entities/httpStatus";
import { Types } from "mongoose";

export class JobContractController{
    private _jobContractUseCase:IJobContractUseCase
    constructor(jobContractUseCase:IJobContractUseCase){
        this._jobContractUseCase=jobContractUseCase
    }
    async viewContract(req:Request,res:Response):Promise<void>{
        try {
            const id=new Types.ObjectId(req.query.id as string)
            console.log("id contract",id)
         
            const {contract,freelancer}=await this._jobContractUseCase.contractDetails({id})
            if(!contract)res.status(HttpStatus.FORBIDDEN).json({message:"Contract not found"})
            res.status(HttpStatus.OK).json({contract,freelancer})
        } catch (error) {
            
        }
    }
}
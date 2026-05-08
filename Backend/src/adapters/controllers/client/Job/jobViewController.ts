import { Request, Response } from "express";
import { IJobViewUseCase } from "../../../../domain/interface/useCaseInterface/client/jobs/jobViewUseCase";
import { HttpStatus } from "../../../../domain/entities/httpStatus";
import { Types } from "mongoose";

export class JobViewController{
    private _jobViewUseCase:IJobViewUseCase
    constructor(jobViewUseCase:IJobViewUseCase){
        this._jobViewUseCase=jobViewUseCase
    }
   async viewJob(req:Request,res:Response):Promise<void>{
        try {
            const id=new Types.ObjectId(req.params.id)
            const response =await this._jobViewUseCase.viewJob({id})
            if(response){
                res.status(HttpStatus.OK).json({message:"job view success",job:response,success:true})
            }
            res.status(HttpStatus.FORBIDDEN).json({message:"job fetch falied",success:false})

        } catch (error) {
            console.error("Error in view job:", error);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
        }
    }
}
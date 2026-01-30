import { Request, Response } from "express";
import { IJobUpdateUseCase } from "../../../../domain/interface/useCaseInterface/client/jobs/iJobUpdateUseCase";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class JobUpdateController{
    private _jobUpdateUseCase:IJobUpdateUseCase
    constructor(jobUpdateUseCase:IJobUpdateUseCase){
        this._jobUpdateUseCase=jobUpdateUseCase
    }
    async updateJob(req:Request,res:Response):Promise<void>{
        try {
            const {...job}=req.body
            console.log("job in update controller ",job,)
            const response=await this._jobUpdateUseCase.updateJob({...job})
            if(!response){
                res.status(HttpStatus.FORBIDDEN).json({message:"error while updating job"})
            }
             res.status(HttpStatus.OK).json({message:"update job successfully",job:response})
        } catch (error) {
            console.log("error in job update controller",error)
        }
    }
}
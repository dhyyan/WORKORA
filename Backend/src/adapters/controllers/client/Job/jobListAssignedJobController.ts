import { Request, Response } from "express";
import { Types } from "mongoose";
import { IJobListAssignedUseCase } from "../../../../domain/interface/useCaseInterface/client/jobs/IJobListAssignedUsecase";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class JobListAssignedController{
    private _jobListAssignUsecase:IJobListAssignedUseCase
    constructor(jobListAssignUsecase:IJobListAssignedUseCase){
        this._jobListAssignUsecase=jobListAssignUsecase
    }
    async list(req:Request,res:Response):Promise<void>{
        try {
            const clientId=new Types.ObjectId(req.params.clientId)
            const response=await this._jobListAssignUsecase.listJobs({clientId})

            if(!response)res.status(HttpStatus.FORBIDDEN).json({message:"job list failed", success:false})
               res.status(HttpStatus.OK).json({message:"job list success", success:true,jobs:response}) 
            
        } catch (error) {
            console.log("error while listing assign job in client controller",error)
        }
    }
}
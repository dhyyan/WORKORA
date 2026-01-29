import { Request, Response } from "express";
import { IJobCreateUseCase } from "../../../../domain/interface/useCaseInterface/client/jobs/jobCreateUseCase";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class JobController{
    private _jobCreateUseCase:IJobCreateUseCase 
    constructor(jobCreateUseCase:IJobCreateUseCase) {
        this._jobCreateUseCase=jobCreateUseCase
    }

    async createJob(req:Request,res:Response):Promise<void>{
        try {
            const {...job}=req.body
            console.log("job details",job)
            const createJob=await this._jobCreateUseCase.create(job)
            if(!createJob){
                res.status(HttpStatus.BAD_REQUEST).json({message:"job not created"})
            }
            res.status(HttpStatus.CREATED).json({message:"job created successfully",jobData:createJob,success:true})
        } catch (error) {
            
        }
    }
}
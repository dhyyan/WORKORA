import { Request, Response } from "express";
import { IJobListUseCase } from "../../../../domain/interface/useCaseInterface/client/jobs/jobListUseCase";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class JobListController{
    private _jobListUseCase:IJobListUseCase
    constructor(jobListUseCase:IJobListUseCase){
        this._jobListUseCase=jobListUseCase
    }
    async listJob(req:Request,res:Response):Promise<void>{
        try {
            const id=req.params.id
            console.log("ideyykuta",id)
            const listJobs=await this._jobListUseCase.listJobs({id})
            if(!listJobs){
                res.status(HttpStatus.NOT_FOUND).json({message:"jobs datas fetched failed",})
            }
            res.status(HttpStatus.OK).json({message:"job list success",jobs:listJobs})
        } catch (error) {
            console.log(error,"error in joblist controller")
        }
    }
}
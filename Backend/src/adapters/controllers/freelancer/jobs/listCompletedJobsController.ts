import { Request, Response } from "express";
import { Types } from "mongoose";
import { IListCompletedJobs } from "../../../../domain/interface/useCaseInterface/freelancer/jobs/IListCompletdJobsUsecase";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class ListCompletedJobsController{
    private _listCompletedJobs:IListCompletedJobs
    constructor(listCompletedJobs:IListCompletedJobs){
        this._listCompletedJobs=listCompletedJobs
    }
    async list(req:Request,res:Response):Promise<void>{
        try {
            const freelancerId=new Types.ObjectId(req.params.freelancerId)
            const response=await this._listCompletedJobs.listJobs({freelancerId})
            console.log("response in copleted job controller",response)
            if(!response)res.status(HttpStatus.FORBIDDEN).json({message:"jobs list failed",success:false})
            res.status(HttpStatus.OK).json({message:"jobs list success",success:true,jobs:response.jobs})    
            
        } catch (error) {
            console.log("error while listing completed jobs in controller",error)
        }
    }
}
import { Request, Response } from "express";
import { Types } from "mongoose";
import { IListAcceptJobUseCase } from "../../../../domain/interface/useCaseInterface/freelancer/jobs/IListAccetJobUseCase";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class ListAcceptJobsController{
    private _listAcceptUsecase:IListAcceptJobUseCase
    constructor(listAcceptUsecase:IListAcceptJobUseCase){
        this._listAcceptUsecase=listAcceptUsecase
    }

    async list(req:Request,res:Response):Promise<void>{
        try {
            let freelancerId=new Types.ObjectId(req.params.freelancerId)
            const response=await this._listAcceptUsecase.listJobs({freelancerId})
            if(!response)res.status(HttpStatus.FORBIDDEN).json({message:"jobs list failed",success:false})
            res.status(HttpStatus.OK).json({message:"jobs list success",success:true,jobs:response.jobs})
        } catch (error) {
            console.log("error while listing freelancer ongoing jobs controller",error)
        }
    }
}
import { Request, Response } from "express";
import { Types } from "mongoose";
import { ISubmitMilestoneUseCase } from "../../../../domain/interface/useCaseInterface/freelancer/jobs/milestone/submitMilestoneUsecase";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class MilestoneSubmitController{
    private _submitMilestoneUsecase:ISubmitMilestoneUseCase
    constructor(submitMilestoneUsecase:ISubmitMilestoneUseCase){
        this._submitMilestoneUsecase=submitMilestoneUsecase
    }
    async submit(req:Request,res:Response):Promise<void>{
        console.log("sdfghsdfhjgjlkihjklg")
        try {
            const milestoneId=new Types.ObjectId(req.params.milestoneId)
            const {taskUrl,description}=req.body
            console.log("data in submit",milestoneId,req.body)

            const response=await this._submitMilestoneUsecase.sumbitTask({milestoneId,taskUrl,description})
            if(!response)res.status(HttpStatus.FORBIDDEN).json({message:"updated milestone failed",success:false})

                res.status(HttpStatus.OK).json({message:"update milestone success",success:true})

        } catch (error) {
            console.log("error while updating milestone in controller",error)
        }
    }
}
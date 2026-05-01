import { Request, Response } from "express";
import { Types } from "mongoose";
import { IRequestMilestoneChangeUseCase } from "../../../../domain/interface/useCaseInterface/client/milestone/iRequestMilestoneChangeUsecase";
import { HttpStatus } from "../../../../domain/entities/httpStatus";


export class RequestMilestoneChangeController{
    private _requestMilestoneChangeUsecase:IRequestMilestoneChangeUseCase
    constructor(requestMilestoneChangeUsecase:IRequestMilestoneChangeUseCase){
        this._requestMilestoneChangeUsecase=requestMilestoneChangeUsecase
    }

    async requestchange(req:Request,res:Response):Promise<void>{
        try {
            const milestoneId=new Types.ObjectId(req.params.milestoneId)
            const reason=req.body.reason
            console.log("reason",reason)

            const response=await this._requestMilestoneChangeUsecase.requestChange({milestoneId,reason})
            if(!response)res.status(HttpStatus.FORBIDDEN).json({message:"request change milestone failed",succes:false})

                res.status(HttpStatus.OK).json({message:"request change milestone success",succes:true})
        } catch (error) {
            console.log("error while request change milestone in controller",error)
        }
    }
}
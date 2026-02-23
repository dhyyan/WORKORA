import { Request, Response } from "express";
import { IApproveMilestonePaymentUsecase } from "../../../../domain/interface/useCaseInterface/client/milestone/iApproveMilestonePaymentUsecase";
import { Types } from "mongoose";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class ApproveMilestonePaymentController{
    private _approveMilestoneUsecase:IApproveMilestonePaymentUsecase
    constructor(approveMilestoneUsecase:IApproveMilestonePaymentUsecase){
        this._approveMilestoneUsecase=approveMilestoneUsecase
    }

    async approve(req:Request,res:Response):Promise<void>{
        try {
            const milestoneId=new Types.ObjectId(req.params.milestoneId)
            const response=await this._approveMilestoneUsecase.approvePayment({milestoneId})

            if(!response)res.status(HttpStatus.FORBIDDEN).json({message:"approve milestone fund failed",success:false})

                res.status(HttpStatus.OK).json({message:"approve milestone fund success",success:true})
        } catch (error) {
            console.log("error while approve milestone fund in controller",error)
        }
    }
}
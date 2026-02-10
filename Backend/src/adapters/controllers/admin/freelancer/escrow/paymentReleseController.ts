import { Request, Response } from "express";
import { IPaymentRelesePaymentUseCase } from "../../../../../domain/interface/useCaseInterface/admin/freelancer/escrow/IPaymentReleseUseCase";
import { HttpStatus } from "../../../../../domain/entities/httpStatus";

export class PaymentReleseController{
    private _paymentReleseUseCase:IPaymentRelesePaymentUseCase
    constructor(paymentReleseUseCase:IPaymentRelesePaymentUseCase){
        this._paymentReleseUseCase=paymentReleseUseCase
    }
    async relesePayment(req:Request,res:Response):Promise<void>{
        try {
            console.log("mlakkale")
            const milestoneId=req.body
            const response=await this._paymentReleseUseCase.relesePayment(milestoneId)
            if(!response)res.status(HttpStatus.BAD_REQUEST).json({message:"error while releasing payment",success:false})
                res.status(HttpStatus.OK).json({message:"success payment relese",success:true})

        } catch (error) {
            console.log("error in relese payment controller",error)
        }
    }
}
import { Request, Response } from "express";
import { IResendOtpUseCase } from "../../../domain/interface/useCaseInterface/client/auth/register/IResendOtpUseCase";
import { HttpStatus } from "../../../domain/entities/httpStatus";

export class ResendOtpController{
    private _resendOtpUseCase:IResendOtpUseCase
    constructor(resendOtpUseCase:IResendOtpUseCase){
        this._resendOtpUseCase=resendOtpUseCase

    }

    async resendOtp(req:Request,res:Response):Promise<void>{
        const {email}=req.body
        console.log("client data from resend otp",email)
        try {
            const resendOtp=await this._resendOtpUseCase.resendOtp({email})
            if(!resendOtp){
                 res.status(HttpStatus.BAD_REQUEST).json({ message: "Email is required" });
                return;
            }
            res.status(HttpStatus.OK).json({ message: "Otp sent to your email." });    
        } catch (error) {
            console.error('error while sending otp', error)
            res.status(HttpStatus.BAD_REQUEST).json({ message: "error while sending otp test", error: error instanceof Error ? error.message : 'error while sending otp' })
        }
    }
}
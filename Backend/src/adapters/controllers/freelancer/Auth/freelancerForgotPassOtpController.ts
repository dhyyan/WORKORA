import { Request, Response } from "express";

import { IFreelancerForgotPassOtpUseCase } from "../../../../domain/interface/useCaseInterface/freelancer/auth/login/IFreelancerForgotPassOtpUseCase";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class FreelancerForgotPassOtpController{
    private _freelancerForgotPassOtpUseCase:IFreelancerForgotPassOtpUseCase
    constructor(freelancerForgotPassOtpUseCase:IFreelancerForgotPassOtpUseCase){
        this._freelancerForgotPassOtpUseCase=freelancerForgotPassOtpUseCase

    }
    async verify(req:Request,res:Response):Promise<void>{
        const {email,otp}=req.body
        try {
            const exist=await this._freelancerForgotPassOtpUseCase.check({email,otp})
        if (exist) {
                        res.status(HttpStatus.OK).json({ message: 'OTP verified successfully', data: exist });
                    } else {
                        res.status(HttpStatus.BAD_REQUEST).json({ error: 'Invalid or expired OTP' });
                    }
                } catch (error) {
                    res.status(HttpStatus.BAD_REQUEST).json({
                        message: "Error while creating client",
                        error: error instanceof Error ? error.message : "Unknown error",
                        stack: error instanceof Error ? error.stack : undefined
                    });
                    console.log(error)
                }
    }
}
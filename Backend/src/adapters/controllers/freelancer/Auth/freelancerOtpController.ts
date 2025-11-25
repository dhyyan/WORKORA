import { Request, Response } from "express";
import { IFreelancerSentOtpUseCase } from "../../../../domain/interface/useCaseInterface/freelancer/auth/register/IfreelancerSendOtpUseCase";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class FreelancerSentOtpController{
    private _freelancerOtpUseCase:IFreelancerSentOtpUseCase
    constructor(freelancerOtpUseCase:IFreelancerSentOtpUseCase){
        this._freelancerOtpUseCase=freelancerOtpUseCase
    }
    async sendOtp(req: Request, res: Response):Promise<void>{
        const {name,email,phone,password}=req.body
        console.log("freelancer data",name,email,phone,password)
        try {
           await this._freelancerOtpUseCase.createOtp({email})
           res.status(HttpStatus.OK).json({ message: "otp sended success", success: true })
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST).json({
                message: "Error while creating Freelancer",
                error: error instanceof Error ? error.message : "Unknown error",
                stack: error instanceof Error ? error.stack : undefined
            });
            console.log(error)
        }
    }
}
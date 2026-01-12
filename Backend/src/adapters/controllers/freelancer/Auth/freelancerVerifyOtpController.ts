import { Request, Response } from "express"
import { IFreelancerVerifyOtpUseCase } from "../../../../domain/interface/useCaseInterface/freelancer/auth/register/IFreelancerVerifyOtpUseCase"
import { HttpStatus } from "../../../../domain/entities/httpStatus"
import { IFreelancerRegisterUseCase } from "../../../../domain/interface/useCaseInterface/freelancer/auth/register/IFreelancerRegisterUseCase"

export class FreelancerVerifyOtpController{

    private _freelancerVerifyOtpUseCase:IFreelancerVerifyOtpUseCase
    private _freelancerRegisterUseCase:IFreelancerRegisterUseCase

    constructor(freelancerVerifyOtpUseCase:IFreelancerVerifyOtpUseCase,freelancerRegisterUseCase:IFreelancerRegisterUseCase){
        this._freelancerVerifyOtpUseCase=freelancerVerifyOtpUseCase
        this._freelancerRegisterUseCase=freelancerRegisterUseCase
    }

    async verify(req:Request,res:Response):Promise<void>{
        const {name,email,phone,password,otp}=req.body
        console.log("freelancer data from verify Otp controller",email,otp)
        try {
            const verify=await this._freelancerVerifyOtpUseCase.verifyOtp({email,otp})
            console.log("otp veriffied",verify)
            if(verify){
                const newUser=await this._freelancerRegisterUseCase.create({name,email,phone,password})
                const returnUser={
                    name:newUser?.name,
                    email:newUser?.email
                }
                console.log("new User Created")
                res.status(HttpStatus.CREATED).json({message:"new user created",returnUser})
            }else{
                res.status(HttpStatus.BAD_REQUEST).json({ error: 'Invalid OTP' });
            }
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST).json({
                message: "Error while creating freelancer",
                error: error instanceof Error ? error.message : "Unknown error",
                stack: error instanceof Error ? error.stack : undefined
            });
            console.log(error)
        }
    }
}
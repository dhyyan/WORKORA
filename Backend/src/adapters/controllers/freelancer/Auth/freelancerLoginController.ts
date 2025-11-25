import { Request, Response } from "express";
import { IFreelancerLoginUseCase } from "../../../../domain/interface/useCaseInterface/freelancer/auth/login/IfreelancerLoginUseCase";
import { HttpStatus } from "../../../../domain/entities/httpStatus";
import { setCookie } from "../../../../frameWork/service/tokenCookes";

export class FreelancerLoginController{

    private _freelancerLoginUseCase:IFreelancerLoginUseCase
    constructor(freelancerLoginUseCase:IFreelancerLoginUseCase){
        this._freelancerLoginUseCase=freelancerLoginUseCase
    }

    async verify(req:Request,res:Response):Promise<void>{
        const{email,password}=req.body
        try {
            const {createdUser,accessToken, refreshToken}=await this._freelancerLoginUseCase.verify({email,password})
           if (!createdUser) {
                           res.status(HttpStatus.BAD_REQUEST).json({ message: 'user not found' })
                           return
                       }
           
                       setCookie(res, refreshToken)
           
                       const freelancerField = {
                           _id: createdUser._id,
                           email: createdUser.email,
                           name: createdUser.name,
                           phone: createdUser.phone,
                           profileImage: createdUser.profileImage,
                           role: createdUser.role,
                           status: createdUser.isBlocked,
                           googleVerification: createdUser.googleId
                       }
                       console.log("logged success")
                       res.status(HttpStatus.OK).json({ message: 'login success', user: freelancerField, accessToken })
                   } catch (error) {
                           console.log('error while login freelancer', error)
                           res.status(HttpStatus.BAD_REQUEST).json({
                           message: "error while login freelancer",
                           error: error instanceof Error ? error.message : 'unknown error from login freelancer controller',
                       })
                   }
           
           
    }
}
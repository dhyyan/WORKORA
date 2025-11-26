import { Request, Response } from "express";
import { IFreelancerChangePassUseCase } from "../../../../domain/interface/useCaseInterface/freelancer/auth/login/IFreelancerChangePassUseCase";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class FreelancerChagePassController {
    private _freelancerChangePass:IFreelancerChangePassUseCase
    constructor(freelancerChangePass:IFreelancerChangePassUseCase){
        this._freelancerChangePass=freelancerChangePass
    }
    async create(req:Request,res:Response):Promise<void>{
        const {email,password}=req.body
        console.log("email password",email,password)

        try {
            const forgettingPassWord=await this._freelancerChangePass.createNewPass({email,password})
            console.log("workinggg")
            if (!forgettingPassWord) {
                            console.log("password was not updated")
                            res.status(HttpStatus.BAD_REQUEST).json({ message: 'error while forget password user' })
                            return
                        }
                        console.log("password updated")
                        res.status(HttpStatus.OK).json({ message: "password changed" })
                    } catch (error) {
                        console.log('error while forget password', error)
                        res.status(HttpStatus.BAD_REQUEST).json({
                            message: 'error while forget password client',
                            error: error instanceof Error ? error.message : 'error while forget password client'
                        })
                    }
    }


}
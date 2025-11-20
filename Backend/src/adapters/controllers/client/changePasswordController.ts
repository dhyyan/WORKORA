import { Request, Response } from "express";
import { IChangePasswordUseCase } from "../../../domain/interface/useCaseInterface/client/auth/password/IChangePasswordUseCase";
import { HttpStatus } from "../../../domain/entities/httpStatus";

export class NewPasswordController {
    private _changePasswordUseCase:IChangePasswordUseCase
    constructor(changePasswordUseCase:IChangePasswordUseCase){
        this._changePasswordUseCase=changePasswordUseCase
    }

    async updatePassword(req:Request,res:Response):Promise<void>{
        const {email,password}=req.body
        console.log("update pass received controller",email,password)
        try {
            const forgettingPassWord=await this._changePasswordUseCase.update({email,password})
            if (!forgettingPassWord) {
                console.log("password was notupdated")
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
import { Request, Response } from "express";
import { IGoogleAuthUseCase } from "../../../domain/interface/useCaseInterface/client/auth/login/IGoogleAuthUseCase";
import { HttpStatus } from "../../../domain/entities/httpStatus";

export class ClientGoogleController{
    private _googleAuthUseCase:IGoogleAuthUseCase
    constructor(googleAuthUseCase:IGoogleAuthUseCase) {
        this._googleAuthUseCase=googleAuthUseCase
    }
    async googleAuth(req:Request,res:Response):Promise<void>{

        try {
            const {token}=req.body
            console.log("google token in controller",token)
            const {client,accessToken,refreshToken}=await this._googleAuthUseCase.googleSign({token})
            if(client){
                res.status(HttpStatus.OK).json({message:"google sign success",data:client,accessToken})
            }

        } catch (error) {
            console.log("|error in google signIn",error)
        }

    }
}
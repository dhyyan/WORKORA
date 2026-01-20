import { Request, Response } from "express";
import { IClientLoginUseCase } from "../../../../domain/interface/useCaseInterface/client/auth/login/IClientLoginUseCase";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class AdminLoginController{
    private _clientLoginUseCase:IClientLoginUseCase
    constructor(clientLoginUseCase:IClientLoginUseCase){
        this._clientLoginUseCase=clientLoginUseCase
        
    }
    async login(req:Request,res:Response):Promise<void>{
        const {email,password}=req.body
        console.log('req.body :>> ', req.body);
        if(!email||!password)console.log("required fields are missing")
        try {
    const {createdUser,accessToken,refreshToken}=await this._clientLoginUseCase.logiClient({email,password})
    const data={
        email:createdUser.email,
        name:createdUser.name
    }
    console.log("wodkk",data)
            if(createdUser){
                res.status(HttpStatus.OK).json({message:"admin login success",data:data})
            }
        
        } catch (error) {
            
        }
    }
}


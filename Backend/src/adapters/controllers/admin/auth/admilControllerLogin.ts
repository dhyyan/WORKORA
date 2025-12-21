import { Request, Response } from "express";
import { IClientLoginUseCase } from "../../../../domain/interface/useCaseInterface/client/auth/login/IClientLoginUseCase";

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
            const exist=await this._clientLoginUseCase.logiClient({email,password})
        
        } catch (error) {
            
        }
    }
}


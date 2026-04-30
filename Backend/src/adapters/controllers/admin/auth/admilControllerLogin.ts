import { Request, Response } from "express";
import { IClientLoginUseCase } from "../../../../domain/interface/useCaseInterface/client/auth/login/IClientLoginUseCase";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class AdminLoginController{
    private _clientLoginUseCase:IClientLoginUseCase
    constructor(clientLoginUseCase:IClientLoginUseCase){
        this._clientLoginUseCase=clientLoginUseCase
        
    }
    async login(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body
        console.log('req.body :>> ', req.body);
        
        if (!email || !password) {
            res.status(HttpStatus.BAD_REQUEST).json({ message: "Email and password are required" });
            return;
        }

        try {
            const { createdUser, accessToken, refreshToken } = await this._clientLoginUseCase.logiClient({ email, password })
            
            const data = {
                email: createdUser.email,
                name: createdUser.name
            }
            
            if (createdUser) {
                res.status(HttpStatus.OK).json({ message: "Admin login successful", data: data, accessToken })
            } else {
                res.status(HttpStatus.UNAUTHORIZED).json({ message: "Invalid credentials" });
            }
        } catch (error: any) {
            console.error("Login controller error:", error);
            res.status(HttpStatus.UNAUTHORIZED).json({ message: error.message || "Login failed" });
        }
    }
}


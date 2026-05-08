import { Request, Response } from "express";
import { IClientLoginUseCase } from "../../../domain/interface/useCaseInterface/client/auth/login/IClientLoginUseCase";
import { HttpStatus } from "../../../domain/entities/httpStatus";
import { setCookie } from "../../../frameWork/service/tokenCookes";

export class ClientLogin {
    private _clientLoginUseCase: IClientLoginUseCase
    constructor(clientLoginUseCase: IClientLoginUseCase) {
        this._clientLoginUseCase = clientLoginUseCase
    }

    async handleLogin(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body
        console.log("email and password received from login controller", email, password)
        try {

            const { createdUser, accessToken, refreshToken } = await this._clientLoginUseCase.logiClient({ email, password })
            if (!createdUser) {
                res.status(HttpStatus.BAD_REQUEST).json({ message: 'user not found' })
                return
            }

            setCookie(res, refreshToken)

            const clientField = {
                _id:createdUser._id,
                email: createdUser.email,
                name: createdUser.name,
                phone: createdUser.phone,
                profileImage: createdUser.profileImage,
                role: createdUser.role,
                status: createdUser.isBlocked,
                googleVerification: createdUser.googleId
            }
            console.log("logged success")
            res.status(HttpStatus.OK).json({ message: 'login success', user: clientField, accessToken })
        } catch (error) {
                console.log('error while login client', error)
                res.status(HttpStatus.BAD_REQUEST).json({
                message: "error while login client",
                error: error instanceof Error ? error.message : 'unknown error from login client controller',
            })
        }


    }
}   
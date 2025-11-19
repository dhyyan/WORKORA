import { Request, Response } from "express";
import { ISendOtpUseCase } from "../../../domain/interface/useCaseInterface/client/auth/register/ISendOtpUseCase";
import { HttpStatus } from "../../../domain/entities/httpStatus";

export class SendOtpController {
    private _clientSentOtpUseCase: ISendOtpUseCase
    constructor(clientSentOtpUseCase: ISendOtpUseCase) {
        this._clientSentOtpUseCase = clientSentOtpUseCase
    }

    async sendOtp(req: Request, res: Response): Promise<void> {
        try {
            const { email } = req.body
            console.log("sign up detail from controller", req.body)
            await this._clientSentOtpUseCase.excute(email)
            res.status(HttpStatus.OK).json({ message: "otp sended success", success: true })
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST).json({
                message: "Error while creating client",
                error: error instanceof Error ? error.message : "Unknown error",
                stack: error instanceof Error ? error.stack : undefined
            });
            console.log(error)
        }
    }
}
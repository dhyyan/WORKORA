import { Request, Response } from "express";
import { ForgotOtpPasswordUseCase } from "../../../useCase/client /auth/password/forgotOtpPasswordUseCase";
import { IForgotOtpPasswordUseCase } from "../../../domain/interface/useCaseInterface/client/auth/password/IForgotOtpPasswordUseCase";
import { HttpStatus } from "../../../domain/entities/httpStatus";

export class VerifyOtpPassword {
    private _forgotOtpUseCase: IForgotOtpPasswordUseCase
    constructor(forgotOtpUseCase: ForgotOtpPasswordUseCase) {
        this._forgotOtpUseCase = forgotOtpUseCase
    }

    async verifyOtp(req: Request, res: Response): Promise<void> {
        const { email, otp } = req.body
        try {
            const verify = await this._forgotOtpUseCase.valid({ email, otp });
            if (verify) {
                res.status(HttpStatus.OK).json({ message: 'OTP verified successfully', data: verify });
            } else {
                res.status(HttpStatus.BAD_REQUEST).json({ error: 'Invalid or expired OTP' });
            }
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
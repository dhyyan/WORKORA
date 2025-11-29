import { Request, Response } from "express";
import { IForgotPasswordUseCase } from "../../../domain/interface/useCaseInterface/client/auth/password/IForgotPasswordUseCase";
import { HttpStatus } from "../../../domain/entities/httpStatus";

export class SendOtpForgotPasswordController {

    private _forgotPasswordUseCase: IForgotPasswordUseCase
    constructor(forgotPasswordUseCase: IForgotPasswordUseCase) {
        this._forgotPasswordUseCase = forgotPasswordUseCase
    }
    async handleForgotPassword(req: Request, res: Response):Promise<void>{
        const { email } = req.body
        console.log("forgot email",email)
        try {
            const exist = await this._forgotPasswordUseCase.excute({ email })
            if (exist) {
                res.status(HttpStatus.OK).json({ message: "otp will send your email" })
            } else {
                res.status(HttpStatus.NOT_FOUND).json({ message: "user not find" })
            }
        } catch (error) {
            console.error("Error in forgot password:", error);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: "Failed to send password reset instructions",
                error: error instanceof Error ? error.message : "Unknown error"
            });
        }
    }
}
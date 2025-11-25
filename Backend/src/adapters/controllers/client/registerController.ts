import { Request, Response } from "express";
import { IVerifyOtpUseCase } from "../../../domain/interface/useCaseInterface/client/auth/register/IVerifyOtpUseCase";
import { IRegisterClientUseCase } from "../../../domain/interface/useCaseInterface/client/auth/register/IRegisterUseCase";
import { HttpStatus } from "../../../domain/entities/httpStatus";

export class ClientRegisterController {

    private _verifyOtp: IVerifyOtpUseCase
    private _clientRegister: IRegisterClientUseCase
    constructor(verifyOtp: IVerifyOtpUseCase, clientRegister: IRegisterClientUseCase) {
        this._verifyOtp = verifyOtp
        this._clientRegister = clientRegister
    }

    async register(req: Request, res: Response): Promise<void> {
        const { email, name, password, phone, otp } = req.body
        console.log("verify otp ", req.body)

        try {
            const client = {
                email, name, password, phone
            }
            const verify = await this._verifyOtp.verify(email, otp)
            if (verify) {
                const newUser = await this._clientRegister.createClient(client)
                console.log("user created")
                const resUser = {
                    name: newUser?.name,
                    email: newUser?.email
                }
                res.status(HttpStatus.CREATED).json({ message: "new user created successfully", resUser })
            } else {
                res.status(HttpStatus.NOT_FOUND).json({ error: 'Invalid OTP',message:"Invalid OTP"});
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
import { Request, Response, Router } from "express";
import { clientLogin, clientRegisterController, newPasswordController, resendOtpController, sendOtpController, sendOtpForgotPasswordController, verifyOtpPassword } from "../../DI/clientInject";

export class UserRoutes {
    public UserRoutes: Router
    constructor() {
        console.log("worked")
        this.UserRoutes = Router()
        this._setRoutes()
    }

    private _setRoutes() {
        console.log("heee")
        this.UserRoutes.post("/signup", (req: Request, res: Response) => {
            console.log("passed 1st url")
            sendOtpController.sendOtp(req, res)
        })

        this.UserRoutes.post("/verifyOtp", (req: Request, res: Response) => {
            clientRegisterController.register(req, res)
        })

        this.UserRoutes.post("/login", (req: Request, res: Response) => {
            console.log("route called")
            clientLogin.handleLogin(req, res)
        })

        this.UserRoutes.post("/forgotpassword", (req: Request, res: Response) => {
            sendOtpForgotPasswordController.handleForgotPassword(req, res)
        })

        this.UserRoutes.post('/forgotpassword/verifyOtp',(req:Request,res:Response)=>{
            verifyOtpPassword.verifyOtp(req,res)
        })

        this.UserRoutes.post('/forgotpassword/newpass',(req:Request,res:Response)=>{
            newPasswordController.updatePassword(req,res)
        })

        this.UserRoutes.post('/resendOtp',(req:Request,res:Response)=>{
            resendOtpController.resendOtp(req,res)
        })
    }


}
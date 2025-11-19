import { Request, Response, Router } from "express";
import { clientLogin, clientRegisterController, sendOtpController } from "../../DI/clientInject";

export class UserRoutes{
    public UserRoutes:Router
    constructor(){
        this.UserRoutes=Router()
        this._setRoutes()
    }

    private _setRoutes(){
        this.UserRoutes.post("/signup",(req:Request,res:Response)=>{
            console.log("passed 1st url")
        sendOtpController.sendOtp(req,res)
        })

        this.UserRoutes.post("/verifyOtp",(req:Request,res:Response)=>{
            clientRegisterController.register(req,res)
        })

        this.UserRoutes.post("/login",(req:Request,res:Response)=>{
            console.log("route called")
            clientLogin.handleLogin(req,res)
        })

        // this.UserRoutes.post("/forgotpassword",(req:Request,res:Response)=>{
        //     sendOtpForgotPasswordController.handleForgotPassword(req,res)
        // })
    }


}
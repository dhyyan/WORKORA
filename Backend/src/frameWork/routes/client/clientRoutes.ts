import { Request, response, Response, Router } from "express";
import { clientDataController, clientGoogleController, clientLogin, clientProfileUpdateController, clientRegisterController, jobCreateController, jobListController, newPasswordController, resendOtpController, sendOtpController, sendOtpForgotPasswordController, verifyOtpPassword } from "../../DI/clientInject";
import { tokenVerifyMiddleware } from "../../../adapters/middlewares/tokenVerifyMiddleware";
import { authMiddleware } from "../../../adapters/middlewares/authMiddleware";

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

        this.UserRoutes.post("/verifyotp", (req: Request, res: Response) => {
            clientRegisterController.register(req, res)
        })

        this.UserRoutes.post("/login", (req: Request, res: Response) => {
            console.log("route called")
            clientLogin.handleLogin(req, res)
        })

        this.UserRoutes.post("/forgotpassword", (req: Request, res: Response) => {
            sendOtpForgotPasswordController.handleForgotPassword(req, res)
        })

        this.UserRoutes.post('/forgotpassword/verifyotp',(req:Request,res:Response)=>{
            verifyOtpPassword.verifyOtp(req,res)
        })

        this.UserRoutes.post('/forgotpassword/newpass',(req:Request,res:Response)=>{
            newPasswordController.updatePassword(req,res)
        })

        this.UserRoutes.post('/resendotp',(req:Request,res:Response)=>{
            resendOtpController.resendOtp(req,res)
        })

        this.UserRoutes.post('/updateprofile',tokenVerifyMiddleware,authMiddleware,(req:Request,res:Response)=>{
            console.log("hy chellooo")
            clientProfileUpdateController.updateProfile(req,res)
        })

        this.UserRoutes.post("/google",(req:Request,res:Response)=>{
            clientGoogleController.googleAuth(req,res)
        })

        this.UserRoutes.get("/userdata/:userId",tokenVerifyMiddleware,authMiddleware,(req:Request,res:Response)=>{
            console.log("tokeeeeeap") 
            clientDataController.data(req,res)
        })

        this.UserRoutes.post("/postjob",(req:Request,res:Response)=>{
            jobCreateController.createJob(req,res)
        })

        this.UserRoutes.get("/jobs/:id",(req:Request,res:Response)=>{
            jobListController.listJob(req,res)
        })


    }


}
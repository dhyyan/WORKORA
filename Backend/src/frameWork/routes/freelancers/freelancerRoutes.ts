import { Request, Response, Router } from "express";
import { freelancerChangePassController, freelancerDataController, freelancerForgotPassController, freelancerForgotPassOtpController, freelancerLoginController, freelancerResendOtpController, freelancerSendOtpController, freelancerUpdateProfileController, freelancerVerifyOtpController, freelancerGoogleController } from "../../DI/freelancerInject";
import { tokenVerifyMiddleware } from "../../../adapters/middlewares/tokenVerifyMiddleware";
import { authMiddleware } from "../../../adapters/middlewares/authMiddleware";

export class FreelancerRoutes {
    public FreelancerRoutes: Router
    constructor() {
        this.FreelancerRoutes = Router()
        this._SetRoute()
    }
    private _SetRoute() {
        console.log('clalllllll')
        this.FreelancerRoutes.post("/signup", (req: Request, res: Response) => {
            console.log("signup route called")
            freelancerSendOtpController.sendOtp(req, res)
        })

        this.FreelancerRoutes.post("/verifyotp", (req: Request, res: Response) => {
            freelancerVerifyOtpController.verify(req, res)
        })

        this.FreelancerRoutes.post("/login", (req: Request, res: Response) => {
            freelancerLoginController.verify(req, res)
        })

        this.FreelancerRoutes.post("/resendotp", (req: Request, res: Response) => {
            freelancerResendOtpController.resendOtp(req, res)
        })

        this.FreelancerRoutes.post('/forgotpassword', (req: Request, res: Response) => {
            console.log("clled")
            freelancerForgotPassController.sendOtp(req, res)
        })

        this.FreelancerRoutes.post('/forgotpassword/verifyotp', (req: Request, res: Response) => {
            freelancerForgotPassOtpController.verify(req, res)
        })

        this.FreelancerRoutes.post('/forgotpassword/newpass', (req: Request, res: Response) => {
            freelancerChangePassController.create(req, res)
        })

        this.FreelancerRoutes.post("/updateprofile",tokenVerifyMiddleware,authMiddleware, (req: Request, res: Response) => {
            freelancerUpdateProfileController.update(req, res)
        })

        this.FreelancerRoutes.get("/userdata/:userId",tokenVerifyMiddleware,authMiddleware, (req: Request, res: Response) => {
            freelancerDataController.userData(req, res)
        })

        this.FreelancerRoutes.post("/google", (req: Request, res: Response) => {
            freelancerGoogleController.googleAuth(req, res)
        })
    }
}
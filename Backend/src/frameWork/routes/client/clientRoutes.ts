import { Request, response, Response, Router } from "express";
import { approveMilestonePaymentController, bidListController, clientDataController, clientGoogleController, clientLogin, clientProfileUpdateController, clientRegisterController, escrowFundController, hireFreelancerController, jobContractController, jobCreateController, jobDeleteController, jobListAssigneJobController, jobListController, jobUpdateController, jobViewController, milestoneController, newPasswordController, paymentCheckoutController, requestMilestoneChangeController, resendOtpController, sendOtpController, sendOtpForgotPasswordController, stripeWebhookController, verifyOtpPassword } from "../../DI/clientInject";
import { tokenVerifyMiddleware } from "../../../adapters/middlewares/tokenVerifyMiddleware";
import { authMiddleware } from "../../../adapters/middlewares/authMiddleware";
import express from "express";

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

        this.UserRoutes.post('/forgotpassword/verifyotp', (req: Request, res: Response) => {
            verifyOtpPassword.verifyOtp(req, res)
        })

        this.UserRoutes.post('/forgotpassword/newpass', (req: Request, res: Response) => {
            newPasswordController.updatePassword(req, res)
        })

        this.UserRoutes.post('/resendotp', (req: Request, res: Response) => {
            resendOtpController.resendOtp(req, res)
        })

        this.UserRoutes.post('/updateprofile', tokenVerifyMiddleware, authMiddleware, (req: Request, res: Response) => {
            clientProfileUpdateController.updateProfile(req, res)
        })

        this.UserRoutes.post("/google", (req: Request, res: Response) => {
            clientGoogleController.googleAuth(req, res)
        })

        this.UserRoutes.get("/userdata/:userId", tokenVerifyMiddleware, authMiddleware, (req: Request, res: Response) => {
            console.log("tokeeeeeap")
            clientDataController.data(req, res)
        })

        this.UserRoutes.post("/postjob", tokenVerifyMiddleware, authMiddleware, (req: Request, res: Response) => {
            jobCreateController.createJob(req, res)
        })

        this.UserRoutes.get("/jobs/:id", tokenVerifyMiddleware, authMiddleware, (req: Request, res: Response) => {
            console.log("hummbo")
            jobListController.listJob(req, res)
        })

        this.UserRoutes.get("/job/:id", tokenVerifyMiddleware, authMiddleware, (req: Request, res: Response) => {
            jobViewController.viewJob(req, res)
        })

        this.UserRoutes.put("/updatejob", tokenVerifyMiddleware, authMiddleware, (req: Request, res: Response) => {
            console.log("hy chellooo")
            jobUpdateController.updateJob(req, res)
        })

        this.UserRoutes.delete("/deletejob/:id", tokenVerifyMiddleware, authMiddleware, (req: Request, res: Response) => {
            jobDeleteController.delete(req, res)
        })

        this.UserRoutes.get("/bids/:jobId", tokenVerifyMiddleware, authMiddleware, (req: Request, res: Response) => {
            bidListController.listBids(req, res)
        })

        this.UserRoutes.post("/hirefreelancer", tokenVerifyMiddleware, authMiddleware, (req: Request, res: Response) => {
            hireFreelancerController.hire(req, res)
        })

        this.UserRoutes.post("/milestone", tokenVerifyMiddleware, authMiddleware, (req: Request, res: Response) => {
            milestoneController.createMilestone(req, res)
        })

        this.UserRoutes.get('/milestone/:jobId', tokenVerifyMiddleware, authMiddleware, (req: Request, res: Response) => {
            milestoneController.getMilestones(req, res)
        })

        this.UserRoutes.get('/contract', tokenVerifyMiddleware, authMiddleware, (req: Request, res: Response) => {
            jobContractController.viewContract(req, res)
        })

        this.UserRoutes.post("/payment/checkout",tokenVerifyMiddleware, authMiddleware, (req: Request, res: Response) => {
            paymentCheckoutController.checkout(req, res)
        })

        this.UserRoutes.post(
            "/stripe/webhook",
            express.raw({ type: "application/json" }), // IMPORTANT
            stripeWebhookController.handleWebhook.bind(stripeWebhookController)
        );

        this.UserRoutes.get("/list/jobs/assigned/:clientId",tokenVerifyMiddleware, authMiddleware,(req:Request,res:Response)=>{
            jobListAssigneJobController.list(req,res)
        })

        this.UserRoutes.post("/milestone/approve/payment/:milestoneId",(req:Request,res:Response)=>{
            approveMilestonePaymentController.approve(req,res)
        })

        this.UserRoutes.post("/milestone/requstchange/:milestoneId",(req:Request,res:Response)=>{
            requestMilestoneChangeController.requestchange(req,res)
        })

    }


}
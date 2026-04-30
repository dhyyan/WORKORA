import { Request, Response, Router } from "express";
import { adminLoginController, categoryController, clientListController, concernListController, freelancerListController, getSubscriptionRevenueController, milestoneListController, paymentReleseController, userBlockController } from "../../DI/adminInject";

export class AdminRoutes {
    public AdminRoutes: Router
    constructor() {
        console.log("Admin routes success")
        this.AdminRoutes = Router()
        this._SetRoutes()
    }

    private _SetRoutes() {
        console.log("admin login route")
        this.AdminRoutes.post('/login', (req: Request, res: Response) => {
            adminLoginController.login(req, res)
        })

        this.AdminRoutes.get("/listclient", (req: Request, res: Response) => {
            clientListController.listUser(req, res)
        })


        this.AdminRoutes.get("/listfreelancer", (req: Request, res: Response) => {
            freelancerListController.listFreelancer(req, res)
        })

        this.AdminRoutes.patch("/block/:id", (req: Request, res: Response) => {
            userBlockController.block(req, res)
        })

        this.AdminRoutes.post("/relesepayment/:id", (req: Request, res: Response) => {
            paymentReleseController.relesePayment(req, res)
        })

        this.AdminRoutes.get("/list/milestone", (req: Request, res: Response) => {
            milestoneListController.list(req, res)
        })

        this.AdminRoutes.post("/categories", (req: Request, res: Response) => {
            categoryController.create(req, res)
        })
        this.AdminRoutes.patch("/categories/status/:id", (req: Request, res: Response) => {
            categoryController.toggleStatus(req, res)
        })

        this.AdminRoutes.get("/categories", (req: Request, res: Response) => {
            categoryController.list(req, res)
        })

        this.AdminRoutes.get("/concern", (req: Request, res: Response) => {
            concernListController.list(req, res)
        })

        this.AdminRoutes.post("/concern/release/:id", (req: Request, res: Response) => {
            concernListController.releasePayment(req, res)
        })

        this.AdminRoutes.get("/subscriptions", (req: Request, res: Response) => {
            getSubscriptionRevenueController.getSubscriptions(req, res)
        })
    }
}
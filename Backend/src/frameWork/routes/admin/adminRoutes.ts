import { Request, Response, Router } from "express";
import { adminLoginController, clientListController, freelancerListController, userBlockController } from "../../DI/adminInject";

export class AdminRoutes{
    public AdminRoutes:Router
    constructor(){
        console.log("Admin routes success")
        this.AdminRoutes=Router()
        this._SetRoutes()
    }

    private _SetRoutes(){
        console.log("admin login route")
        this.AdminRoutes.post('/login',(req:Request,res:Response)=>{
            adminLoginController.login(req,res)
        })

        this.AdminRoutes.get("/listclient",(req:Request,res:Response)=>{
            clientListController.listUser(req,res)
        })


         this.AdminRoutes.get("/listfreelancer",(req:Request,res:Response)=>{
            freelancerListController.listFreelancer(req,res)
         })

         this.AdminRoutes.patch("/block/:id",(req:Request,res:Response)=>{
            userBlockController.block(req,res)
         })
    }
}
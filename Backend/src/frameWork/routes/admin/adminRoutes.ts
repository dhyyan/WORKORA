import { Request, Response, Router } from "express";
import { adminLoginController } from "../../DI/adminInject";

export class AdminROutes{
    public AdminRoutes:Router
    constructor(){
        this.AdminRoutes=Router()
        this._SetROutes()
    }

    private _SetROutes(){
        this.AdminRoutes.post('/login',(req:Request,res:Response)=>{
            adminLoginController.login(req,res)
        })
    }
}
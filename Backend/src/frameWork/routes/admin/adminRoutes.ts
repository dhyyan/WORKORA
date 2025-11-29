import { Request, Response, Router } from "express";

export class AdminROutes{
    public AdminRoutes:Router
    constructor(){
        this.AdminRoutes=Router()
        this._SetROutes()
    }

    private  _SetROutes(){
        this.AdminRoutes.post('/login',(req:Request,res:Response)=>{
            
        })
    }
}
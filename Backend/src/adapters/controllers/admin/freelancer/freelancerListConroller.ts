import { Request, Response } from "express";
import { IFreelancerListUseCase } from "../../../../domain/interface/useCaseInterface/admin/freelancer/freelancerListUseCase";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class FreelancerListController{
    
    private _freelancerListUseCase:IFreelancerListUseCase
    constructor(freelancerListUseCase:IFreelancerListUseCase){
        this._freelancerListUseCase=freelancerListUseCase
    }
    
    async listFreelancer(req:Request,res:Response):Promise<void>{
        try {
            const users=await this._freelancerListUseCase.listFreelancer({})
            res.status(HttpStatus.OK).json({message:"fetch freelancer Datas success",data:users})
        } catch (error) {
            
        }
    }
}
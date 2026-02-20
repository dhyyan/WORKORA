import { Request, Response } from "express";
import { IListBidUsecase } from "../../../../domain/interface/useCaseInterface/freelancer/jobs/bid/IListBidUseCase";
import { Types } from "mongoose";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class ListBidController{
    private _listBidUsecase:IListBidUsecase
    constructor(listBidUsecase:IListBidUsecase){
        this._listBidUsecase=listBidUsecase
    }
    async list(req:Request,res:Response):Promise<void>{
        try {
            const freelancerId=new Types.ObjectId(req.params.freelancerId)
            console.log("frelancer id in bid controller",freelancerId)
            const response=await this._listBidUsecase.listBids({freelancerId})
            console.log("response in controller",response)
            if(!response)res.status(HttpStatus.FORBIDDEN).json({message:"error while fetching bids",success:false})
                res.status(HttpStatus.OK).json({message:"fetching bids successfully",bids:response,success:true})
            
        } catch (error) {
            console.log("error while fetching bids in controller",error)
        }
    }
}
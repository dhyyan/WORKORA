import { Request, Response } from "express";
import { IConcernListUsecase } from "../../../../domain/interface/useCaseInterface/admin/concern/IConcernListUsecase";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class ConcernListController {
    private _concerLiseUsecase:IConcernListUsecase
    constructor(concernListUsecase:IConcernListUsecase) {
        this._concerLiseUsecase=concernListUsecase
    }

    async list(req: Request, res: Response): Promise<void> {
        try {
            const concern=await this._concerLiseUsecase.list()
            if(concern){
                res.status(HttpStatus.OK).json({success:true,concern})
            }else{
                res.status(HttpStatus.NOT_FOUND).json({success:false,message:"No concern found"})
            }
        } catch (_error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({success:false,message:"Internal server error"})
        }
    }

    async releasePayment(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { receiver } = req.body;
            if (!receiver || !['client', 'freelancer'].includes(receiver)) {
                res.status(HttpStatus.BAD_REQUEST).json({ success: false, message: "Invalid receiver" });
                return;
            }
            const result = await this._concerLiseUsecase.releasePayment(id, receiver as 'client' | 'freelancer');
            res.status(HttpStatus.OK).json(result);
        } catch (error: any) {
            console.error("Error releasing payment:", error);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message || "Internal server error" });
        }
    }
}
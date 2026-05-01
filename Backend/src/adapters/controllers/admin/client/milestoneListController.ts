import { Request, Response } from "express";
import { IMilestoneListUseCase } from "../../../../domain/interface/useCaseInterface/admin/client/ImilestoneListUseCase";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class MilestoneListController {
    private _milestoneUsecase: IMilestoneListUseCase
    constructor(milestoneUsecase: IMilestoneListUseCase) {
        this._milestoneUsecase = milestoneUsecase
    }
    async list(req: Request, res: Response): Promise<void> {
        try {
            const page = parseInt(req.query.page as string)
            const limit = parseInt(req.query.limit as string)
            const response = await this._milestoneUsecase.listMilestone({page,limit})
            if(!response)res.status(HttpStatus.FORBIDDEN).json({message:"error while listing milestones"})
                res.status(HttpStatus.OK).json({message:"listing milestones success",response})
        } catch (error) {

        }
    }
}
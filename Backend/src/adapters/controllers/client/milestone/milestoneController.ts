import { Request, Response } from "express";
import { IMilestoneUseCase } from "../../../../domain/interface/useCaseInterface/client/milestone/iMilestoneUseCase";
import { HttpStatus } from "../../../../domain/entities/httpStatus";
import { Types } from "mongoose";

export class MilestoneController {
    private _milestoneUseCase: IMilestoneUseCase;
    constructor(milestoneUseCase: IMilestoneUseCase) {
        this._milestoneUseCase = milestoneUseCase
    }
    async createMilestone(req: Request, res: Response): Promise<void> {
        try {
            const { jobId, title, amount } = req.body
            console.log("data in milestone", req.body)
            const createMilestone = await this._milestoneUseCase.createMilestone({ jobId, title, amount })
            if (!createMilestone) {
                res.status(HttpStatus.NOT_FOUND).json({ message: "Failed to create milestone" })
            }
            res.status(HttpStatus.CREATED).json({ message: "Milestone created successfully", milestone: createMilestone.milestone })
        } catch (error) {
            console.log("error in milestone controller", error)
        }
    }

    async getMilestones(req: Request, res: Response): Promise<void> {
        try {
            const  jobId  = new Types.ObjectId(req.params.jobId)
            const result = await this._milestoneUseCase.getMilestones(jobId);
            if (!result.success) {
                res.status(HttpStatus.NOT_FOUND).json({ message: "Failed to fetch milestones" });
                return; // Add return to avoid further execution
            }
            res.status(HttpStatus.OK).json({ milestones: result.milestones });
        } catch (error) {
            console.log("error in getMilestones controller", error);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
        }
    }

   
}
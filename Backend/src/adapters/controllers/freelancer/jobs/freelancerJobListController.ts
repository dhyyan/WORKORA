import { Request, Response } from "express";
import { IFreelancerListJobUseCase } from "../../../../domain/interface/useCaseInterface/freelancer/jobs/iFreelancerJobListUseCase";
import { HttpStatus } from "../../../../domain/entities/httpStatus";
import { Types } from "mongoose";

export class FreelancerJobListController {
    private _freelancerJobListUseCase: IFreelancerListJobUseCase
    constructor(freelancerJobListUseCase: IFreelancerListJobUseCase) {
        this._freelancerJobListUseCase = freelancerJobListUseCase
    }

    async listJob(req: Request, res: Response) {
        try {
            console.log("f job list controller called")
            const response = await this._freelancerJobListUseCase.listJobs()
            if (!response) {
                res.status(HttpStatus.FORBIDDEN).json({ message: "failed while listing jobs", success: false })
            }
            res.status(HttpStatus.OK).json({ message: "listing jobs success", success: true, response })
        } catch (error) {
            console.log("error while job listing in controller", error)
        }
    }

    async getJobById(req: Request, res: Response) {
        try {
            const  id  = new Types.ObjectId(req.params.id)
            const response = await this._freelancerJobListUseCase.findJobById(id);
            if (!response) {
                res.status(HttpStatus.NOT_FOUND).json({ message: "Job not found", success: false });
                return;
            }
            res.status(HttpStatus.OK).json({ message: "Job details fetched successfully", success: true, response });
        } catch (error) {
            console.log("error while fetching job details in controller", error);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Internal server error", success: false });
        }
    }
}
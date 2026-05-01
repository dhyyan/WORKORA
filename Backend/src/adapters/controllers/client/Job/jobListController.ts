import { Request, Response } from "express";
import { IJobListUseCase } from "../../../../domain/interface/useCaseInterface/client/jobs/jobListUseCase";
import { HttpStatus } from "../../../../domain/entities/httpStatus";
import { Types } from "mongoose";

export class JobListController {
    private _jobListUseCase: IJobListUseCase
    constructor(jobListUseCase: IJobListUseCase) {
        this._jobListUseCase = jobListUseCase
    }
    async listJob(req: Request, res: Response): Promise<void> {
        try {
            const id = new Types.ObjectId(req.params.id);
            console.log("ideyykuta", id);

            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 5;

            const listJobs = await this._jobListUseCase.listJobs({ id, page, limit });

            if (!listJobs) {
                res.status(HttpStatus.NOT_FOUND).json({ message: "jobs datas fetched failed" });
                return;
            }

            res.status(HttpStatus.OK).json({
                message: "job list success",
                jobs: listJobs.jobs,
                totalJobs: listJobs.totalJobs
            });
        } catch (error) {
            console.log(error, "error in joblist controller");
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
        }
    }
}
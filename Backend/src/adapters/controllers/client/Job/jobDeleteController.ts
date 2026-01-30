import { Request, Response } from "express";
import { IJobDeleteUseCase } from "../../../../domain/interface/useCaseInterface/client/jobs/IJobDeleteUseCase";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class JobDeleteController {
    private _jobDeleteUseCase: IJobDeleteUseCase
    constructor(jobDeleteUseCase: IJobDeleteUseCase) {
        this._jobDeleteUseCase = jobDeleteUseCase
    }
    async delete(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id
            const response = await this._jobDeleteUseCase.deleteJob({ id })
            if (!response) {
                res.status(HttpStatus.FORBIDDEN).json({ message: "error while delting job" })
            }
            res.status(HttpStatus.OK).json({ message: "delete job successfully", success:true })
        } catch (error) {

        }
    }
}
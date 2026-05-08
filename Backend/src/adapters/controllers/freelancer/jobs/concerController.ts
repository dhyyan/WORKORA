import { Request, Response } from "express";
import { IConcernUseCase } from "../../../../domain/interface/useCaseInterface/freelancer/jobs/IConcernUseCase";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class ConcernController {
    private _concernUsecase: IConcernUseCase
    constructor(concernUsecase: IConcernUseCase) {
        this._concernUsecase = concernUsecase
    }

    async create(req: Request, res: Response) {
        try {
            const concern = await this._concernUsecase.create(req.body)
            if (concern) {
                res.status(HttpStatus.OK).json({ success: true, concern })
            }
            else {
                res.status(HttpStatus.BAD_REQUEST).json({ success: false, message: "Concern not created" })
            }
        } catch (_error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" })
        }
    }
}
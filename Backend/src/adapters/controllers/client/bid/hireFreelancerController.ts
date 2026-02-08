import { Request, Response } from "express";
import { IHireFreelancerUseCase } from "../../../../domain/interface/useCaseInterface/client/bid/iHireFreelancerUseCase";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class HireFreelancerController {
    private _hireFreelancerUseCase: IHireFreelancerUseCase;
    constructor(hireFreelancerUseCase: IHireFreelancerUseCase) {
        this._hireFreelancerUseCase = hireFreelancerUseCase
    }
    async hire(req: Request, res: Response): Promise<void> {
        try {
            const { bidId, jobId, freelancerId, totalAmount } = req.body

            const result = await this._hireFreelancerUseCase.hireFreelancer({ bidId, jobId, freelancerId, totalAmount })
            if (!result) res.status(HttpStatus.BAD_REQUEST).json({ message: "error while hiring freelancer" })
            res.status(HttpStatus.CREATED).json({ message: "freelancer hired successfully", contract: result.contract })
        } catch (error:any) {
            console.log("error in hire freelancer controller", error)

            res.status(HttpStatus.FORBIDDEN).json({message: error.message || "Something went wrong"})
        }
    }
}
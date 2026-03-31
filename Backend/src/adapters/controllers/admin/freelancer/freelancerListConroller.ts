import { Request, Response } from "express";
import { IFreelancerListUseCase } from "../../../../domain/interface/useCaseInterface/admin/freelancer/freelancerListUseCase";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class FreelancerListController {

    private _freelancerListUseCase: IFreelancerListUseCase
    constructor(freelancerListUseCase: IFreelancerListUseCase) {
        this._freelancerListUseCase = freelancerListUseCase
    }

    async listFreelancer(req: Request, res: Response): Promise<void> {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const search = (req.query.search as string) || "";

            console.log("page", page)
            console.log("limit", limit)
            console.log("search", search)

            const response = await this._freelancerListUseCase.listFreelancer({page,limit,search})
            
            if(response)res.status(HttpStatus.OK).json({ message: "fetch freelancer Datas success", response })
                res.status(HttpStatus.FORBIDDEN).json({ message: "fetch freelancer Datas failed"})
            
        } catch (error) {

        }
    }
}
import { Request, Response } from "express";
import { IGetUserUseCase } from "../../../../domain/interface/useCaseInterface/freelancer/dashboard/Profile/IGetProfileUseCase";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class FreelancerDataController {
    private _getUserUseCase: IGetUserUseCase
    constructor(getUserUseCase: IGetUserUseCase) {
        this._getUserUseCase = getUserUseCase
    }

    async userData(req: Request, res: Response): Promise<void> {
        const { userId } = req.params
        console.log("refresh id form controller",userId)
        try { 

            const userDetails = await this._getUserUseCase.getUser({ userId })

            if (!userDetails) {
                res.status(HttpStatus.FORBIDDEN).json({ message: "error while fetching user details" })
            }

            res.status(HttpStatus.OK).json({ message: "user detail fetched success", data: userDetails, success: true })
        } catch (error) {
            console.log(error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'error while fetching user details',
                error: error instanceof Error ? error.message : 'error while fetching user details'
            })

        }
    }
}


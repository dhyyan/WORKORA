import { Request, Response } from "express";
import { ICategoryUsecase } from "../../../../domain/interface/useCaseInterface/admin/client/ICategoryUseCase";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class CategoryController {
    private _categoryUsecase: ICategoryUsecase
    constructor(categoryUsecase: ICategoryUsecase) {
        this._categoryUsecase = categoryUsecase
    }
    async create(req: Request, res: Response): Promise<void> {
        try {
            const { name } = req.body
            const response = await this._categoryUsecase.createCategory({ name })
            if (!response) {
                res.status(HttpStatus.BAD_REQUEST).json({ message: "failed to create category", success: false });
                return;
            }

            res.status(HttpStatus.OK).json({ message: "create category success", success: true })

        } catch (error) {
            console.log("error while creating category in category usecase", error)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Internal server error", success: false })
        }
    }

    async list(req: Request, res: Response): Promise<void> {
        try {
            const response = await this._categoryUsecase.listCategory()
            res.status(HttpStatus.OK).json({ success: true, categories: response.categories })
        } catch (error) {
            console.log("error while listing category in category controller", error)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Internal server error", success: false })
        }
    }

    async toggleStatus(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const response = await this._categoryUsecase.toggleCategoryStatus(id);
            if (!response) {
                res.status(HttpStatus.BAD_REQUEST).json({ message: "failed to toggle category status", success: false });
                return;
            }
            res.status(HttpStatus.OK).json({ message: "toggle status success", success: true })
        } catch (error) {
            console.log("error while toggling category status in controller", error)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Internal server error", success: false })
        }
    }
}
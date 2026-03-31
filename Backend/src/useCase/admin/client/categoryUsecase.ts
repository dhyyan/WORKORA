import { ICategoryInputDtos, ICategoryOutputDtos } from "../../../domain/interface/DTOs/admin/client/clientDtos";
import { ICategoryRepository } from "../../../domain/interface/repositoryInterface/ICategoryRepository";
import { ICategoryUsecase } from "../../../domain/interface/useCaseInterface/admin/client/ICategoryUseCase";

export class CategoryUsecase implements ICategoryUsecase{
    private _categoryRepository:ICategoryRepository
    constructor(categoryRepository:ICategoryRepository){
        this._categoryRepository=categoryRepository
    }
    async createCategory(input: ICategoryInputDtos): Promise<ICategoryOutputDtos> {
        try {
            if(!input)throw new Error("category name is missing")

                const category=await this._categoryRepository.create(input)
                console.log("category",category)
                if(!category)throw new Error("error while creating category")

                    return{
                        _id:category._id!,
                        name:category.name,
                        isListed:category.isListed,
                        createdAt:category.createdAt
                    }

        } catch (error) {
            throw error
        }
    }
}
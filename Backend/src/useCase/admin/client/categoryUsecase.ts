import { Types } from "mongoose";
import { ICategoryInputDtos, ICategoryListOutputDtos, ICategoryOutputDtos } from "../../../domain/interface/DTOs/admin/client/clientDtos";
import { ICategoryRepository } from "../../../domain/interface/repositoryInterface/ICategoryRepository";
import { ICategoryUsecase } from "../../../domain/interface/useCaseInterface/admin/client/ICategoryUseCase";

export class CategoryUsecase implements ICategoryUsecase{
    private _categoryRepository:ICategoryRepository
    constructor(categoryRepository:ICategoryRepository){
        this._categoryRepository=categoryRepository
    }
    async createCategory(input: ICategoryInputDtos): Promise<ICategoryOutputDtos> {
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
    }

    async listCategory(): Promise<ICategoryListOutputDtos> {
        const categories = await this._categoryRepository.findAll()
            const mappedCategories = categories.map(cat => ({
                _id: cat._id!,
                name: cat.name,
                isListed: cat.isListed,
                createdAt: cat.createdAt
            }))
            return { categories: mappedCategories }
    }

    async toggleCategoryStatus(id: string): Promise<boolean> {
        const category = await this._categoryRepository.findById(new Types.ObjectId(id));
            if (!category) throw new Error("Category not found");

            const updatedStatus = !category.isListed;
            const updated = await this._categoryRepository.update(new Types.ObjectId(id), { isListed: updatedStatus });
            return !!updated;
    }
}
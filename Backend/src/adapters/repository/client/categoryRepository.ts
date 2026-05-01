import { Category } from "../../../domain/entities/category.entity";
import { ICategoryRepository } from "../../../domain/interface/repositoryInterface/ICategoryRepository";
import { categoryModel } from "../../../frameWork/database/models/category.model";
import { BaseRepository } from "../BaseRepo/baseRepository";

export class CategoryRepository extends BaseRepository<Category> implements ICategoryRepository{
    constructor(){
        super(categoryModel)
    }
}
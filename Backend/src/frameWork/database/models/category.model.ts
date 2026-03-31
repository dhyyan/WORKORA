import { Document, model, ObjectId } from "mongoose"
import { Category } from "../../../domain/entities/category.entity"
import { categorySchema } from "../schema/category.schema"


export interface ICategoryModel extends Omit<Category, '_id'>, Document {
    _id: ObjectId
}

export const categoryModel = model<Category>('Category', categorySchema)
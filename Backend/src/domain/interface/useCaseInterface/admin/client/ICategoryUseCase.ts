import { ICategoryInputDtos, ICategoryOutputDtos } from "../../../DTOs/admin/client/clientDtos";

export interface ICategoryUsecase {
    createCategory(input:ICategoryInputDtos):Promise<ICategoryOutputDtos>
}
import { UpdateProfileInputDtos, UpdateProfileOututDtos } from "../../../../DTOs/freelancer/ProfileDtos";

export interface IUpdateProfileUseCase{
    update(input:UpdateProfileInputDtos):Promise<UpdateProfileOututDtos>
}
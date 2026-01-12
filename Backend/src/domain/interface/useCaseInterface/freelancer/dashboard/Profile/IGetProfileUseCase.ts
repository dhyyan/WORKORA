import { GetUserDetailOutputDtos, GetUserDetailsInputDtos } from "../../../../DTOs/freelancer/ProfileDtos";

export interface IGetUserUseCase{
    getUser(input:GetUserDetailsInputDtos):Promise<GetUserDetailOutputDtos>
}
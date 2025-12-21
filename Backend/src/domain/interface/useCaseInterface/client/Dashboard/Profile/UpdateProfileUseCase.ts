import { UpateProfileInputDtos, UpateProfileOutputDtos } from "../../../../DTOs/client/ProfileDto";

export interface IUpateProfileUseCase{
    updateProfile(input:UpateProfileInputDtos):Promise<UpateProfileOutputDtos>
}
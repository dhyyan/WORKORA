import { ChangePasswordIputDtos, ChangePasswordOutPutDtos } from "../../../../DTOs/client/AuthDto";

export interface IChangePasswordUseCase{
    update(input:ChangePasswordIputDtos):Promise<ChangePasswordOutPutDtos>
}
import { AuthChangePasswordInputDto, ChangePasswordOutPutDtos } from "../../../../DTOs/client/AuthDto";

export interface IAuthChangePasswordUseCase {
    changePassword(input: AuthChangePasswordInputDto): Promise<ChangePasswordOutPutDtos | null>;
}

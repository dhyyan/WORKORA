import { GoogeleAuthInputDtos } from "../../../../DTOs/client/AuthDto";

export interface IGoogleAuthUseCase {
    googleSign(input: GoogeleAuthInputDtos): Promise<any>
}
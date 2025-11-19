import { ClientLoginInputdDto, ClientLoginOutputdDto } from "../../../../DTOs/client/AuthDto";

export interface IClientLoginUseCase {
    logiClient(input:ClientLoginInputdDto): Promise<ClientLoginOutputdDto>
}
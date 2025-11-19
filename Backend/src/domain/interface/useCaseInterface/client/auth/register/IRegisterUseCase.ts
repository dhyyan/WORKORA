import { Client } from "../../../../../entities/client.entity";
import { ClientRegisterInputDto, ClientRegisteroutputDto } from "../../../../DTOs/client/AuthDto";

export interface IRegisterClientUseCase {
    createClient(client: ClientRegisterInputDto): Promise<ClientRegisteroutputDto>
}
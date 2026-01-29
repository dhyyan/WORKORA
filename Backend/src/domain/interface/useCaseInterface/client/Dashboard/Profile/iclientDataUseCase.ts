import { ClientDataInputDtos, ClientDataOutputDtos } from "../../../../DTOs/client/ProfileDto";

export interface IClientDataUseCase {
    fetchData(input:ClientDataInputDtos):Promise<ClientDataOutputDtos>
}
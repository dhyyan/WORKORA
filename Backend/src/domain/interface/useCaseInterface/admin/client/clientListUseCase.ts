import { ClientListInputDtos, ClientListOutputDtos } from "../../../DTOs/admin/client/clientDtos";

export interface IClientListUseCase {
    listclients(input:ClientListInputDtos):Promise<ClientListOutputDtos>
}
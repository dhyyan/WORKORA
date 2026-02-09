import { MilestoneFundInputDtos, MilestoneFundOutputDtos } from "../../../DTOs/client/escrowDtos";

export interface IEscrowFundUseCase{
    createEscrow(input:MilestoneFundInputDtos):Promise<MilestoneFundOutputDtos>
}
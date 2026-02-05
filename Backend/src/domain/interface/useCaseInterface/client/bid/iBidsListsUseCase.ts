import { BidListInputDtos, BidListOutputDtos } from "../../../DTOs/client/bidDtos";

export interface IBidsListsUseCase {
    listBids(input: BidListInputDtos): Promise<BidListOutputDtos>;
}
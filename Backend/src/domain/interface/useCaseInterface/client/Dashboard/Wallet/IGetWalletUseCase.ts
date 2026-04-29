import { GetWalletInputDto, GetWalletOutputDto } from "../../../../DTOs/client/WalletDtos";

export interface IGetWalletUseCase {
    getWallet(input: GetWalletInputDto): Promise<GetWalletOutputDto>;
}

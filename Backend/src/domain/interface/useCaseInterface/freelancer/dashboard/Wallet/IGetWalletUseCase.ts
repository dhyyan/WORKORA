import { GetWalletInputDto, GetWalletOutputDto } from "../../../../DTOs/freelancer/WalletDtos";

export interface IGetWalletUseCase {
    getWallet(input: GetWalletInputDto): Promise<GetWalletOutputDto>;
}

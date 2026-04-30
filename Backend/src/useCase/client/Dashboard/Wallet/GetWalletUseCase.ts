import { GetWalletInputDto, GetWalletOutputDto } from "../../../../domain/interface/DTOs/client/WalletDtos";
import { IWalletRepository } from "../../../../domain/interface/repositoryInterface/IWalletRepository";
import { IGetWalletUseCase } from "../../../../domain/interface/useCaseInterface/client/Dashboard/Wallet/IGetWalletUseCase";

export class GetWalletUseCase implements IGetWalletUseCase {
    private _walletRepository: IWalletRepository;

    constructor(walletRepository: IWalletRepository) {
        this._walletRepository = walletRepository;
    }

    async getWallet(input: GetWalletInputDto): Promise<GetWalletOutputDto> {
        const { userId, page, limit } = input;
        const skip = (page - 1) * limit;

        try {
            const wallet = await this._walletRepository.findByUserId(userId);
            if (!wallet) {
                return {
                    balance: 0,
                    transactions: [],
                    totalTransactions: 0,
                    totalPages: 0,
                    currentPage: page,
                    totalCredit: 0,
                    totalDebit: 0
                };
            }

            const { transactions, totalTransactions, totalCredit, totalDebit } = await this._walletRepository.findTransactionsByUserId(userId, skip, limit);

            return {
                balance: wallet.balance,
                transactions: transactions,
                totalTransactions: totalTransactions,
                totalPages: Math.ceil(totalTransactions / limit),
                currentPage: page,
                totalCredit: totalCredit,
                totalDebit: totalDebit
            };
        } catch (error) {
            console.error("GetWalletUseCase error:", error);
            throw error;
        }
    }
}

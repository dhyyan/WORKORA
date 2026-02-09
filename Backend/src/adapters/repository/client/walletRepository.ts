import { IWallet } from "../../../domain/entities/wallet.entity";
import { IWalletRepository } from "../../../domain/interface/repositoryInterface/IWalletRepository";
import { walletModel } from "../../../frameWork/database/models/wallet.model";
import { BaseRepository } from "../BaseRepo/baseRepository";

export class WalletRepository extends BaseRepository<IWallet> implements IWalletRepository {
    constructor(){
        super(walletModel)
    }
}
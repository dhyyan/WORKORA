import { IWalletTransaction } from "../../../../domain/entities/wallet.entity";
import { IPaymentReleseInputDtos, IPaymentReleseOutputDtos } from "../../../../domain/interface/DTOs/admin/client/escrowDtos";
import { IContractRepository } from "../../../../domain/interface/repositoryInterface/IContractRepository";
import { IEscrowRepository } from "../../../../domain/interface/repositoryInterface/IEscrowRepository";
import { IMilestoneRepository } from "../../../../domain/interface/repositoryInterface/IMilestoneRepository";
import { IWalletRepository } from "../../../../domain/interface/repositoryInterface/IWalletRepository";
import { IPaymentRelesePaymentUseCase } from "../../../../domain/interface/useCaseInterface/admin/freelancer/escrow/IPaymentReleseUseCase";

export class PaymentReleseUseCase implements IPaymentRelesePaymentUseCase {
    private _mileStoneRepository: IMilestoneRepository
    private _contractRepository: IContractRepository
    private _walletRepository: IWalletRepository
    private _escrowRepository: IEscrowRepository

    constructor(
        mileStoneRepository: IMilestoneRepository,
        contractRepository: IContractRepository,
        walletRepository: IWalletRepository,
        escrowRepository: IEscrowRepository
    ) {
        this._mileStoneRepository = mileStoneRepository
        this._contractRepository = contractRepository
        this._walletRepository = walletRepository
        this._escrowRepository = escrowRepository
    }
    async relesePayment(input: IPaymentReleseInputDtos): Promise<IPaymentReleseOutputDtos> {
        try {
            const milestone = await this._mileStoneRepository.findById(input.milestoneId)
            if (!milestone || !milestone._id) throw new Error("milestone in this id not found")

            const contract = await this._contractRepository.findById(milestone.contractId)
            if (!contract?.freelancerId) throw new Error("freelnacer id is missign in contract")
            const id = contract.freelancerId
            console.log("freelance id for find wallet",id)

            const wallet = await this._walletRepository.findByUserId(id)
            console.log("waltee",wallet)
            if (!wallet || !wallet._id) throw new Error("wallet in this id not found")

         
            const newBalance = wallet.balance + milestone.amount;

            const newTransaction:IWalletTransaction = {
                type: "credit",
                amount: milestone.amount,
                description: "Milestone payment released",
                createdAt: new Date()
            }

            wallet.balance = newBalance;
            wallet.transactions = [
                ...(wallet.transactions || []),
                newTransaction
            ];

            const updateWallet = await this._walletRepository.update(wallet._id, wallet)
            console.log("Payment updated", updateWallet)

            const updateMilestone = await this._mileStoneRepository.update(milestone._id, { status: "released" })
            console.log("Updated milestone", updateMilestone)

            const escrow=await this._escrowRepository.findByMilestoneId(milestone._id)
            console.log("deyyydaak",escrow)
            if(!escrow||!escrow._id)throw new Error("escrow in this milestone id is missing")

            const updateEscrow = await this._escrowRepository.update(escrow._id!, { status: "released" })
            console.log("updateEscrow", updateEscrow)

            return { success: true }

        } catch (error) {
            throw error
        }
    }
}
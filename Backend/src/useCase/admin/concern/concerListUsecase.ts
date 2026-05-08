import { ConcernListOutputDto } from "../../../domain/interface/DTOs/admin/concern/concernDtos";
import { Types } from "mongoose";
import { IConcernRepository } from "../../../domain/interface/repositoryInterface/IConcerRepository";
import { IConcernListUsecase } from "../../../domain/interface/useCaseInterface/admin/concern/IConcernListUsecase";
import { IContractRepository } from "../../../domain/interface/repositoryInterface/IContractRepository";
import { IJobRepository } from "../../../domain/interface/repositoryInterface/IJobRepository";
import { IWalletRepository } from "../../../domain/interface/repositoryInterface/IWalletRepository";
import { IWalletTransaction } from "../../../domain/entities/wallet.entity";
import { IMilestoneRepository } from "../../../domain/interface/repositoryInterface/IMilestoneRepository";
export class ConcernListUsecase implements IConcernListUsecase {
    private _concernRepository: IConcernRepository
    private _contractRepository: IContractRepository
    private _jobRepository: IJobRepository
    private _walletRepository: IWalletRepository
    private _milestoneRepository: IMilestoneRepository

    constructor(
        concernRepository: IConcernRepository,
        contractRepository: IContractRepository,
        jobRepository: IJobRepository,
        walletRepository: IWalletRepository,
        milestoneRepository: IMilestoneRepository
    ) {
        this._concernRepository = concernRepository;
        this._contractRepository = contractRepository;
        this._jobRepository = jobRepository;
        this._walletRepository = walletRepository;
        this._milestoneRepository = milestoneRepository;
    }
    async list(): Promise<ConcernListOutputDto> {
        const concerns = await this._concernRepository.findAll()
        console.log("concerns listed in admin", concerns)
        const mappedConcerns = concerns.map(c => ({
            id: c._id!.toString(),
            contractId: c.contractId.toString(),
            description: c.description,
            amount: c.amount,
            status: c.status,
            createdAt: c.createdAt!
        }))
        return { concern: mappedConcerns }
    }

    async releasePayment(id: string, receiver: 'client' | 'freelancer'): Promise<{ success: boolean; }> {
        const concern = await this._concernRepository.findById(new Types.ObjectId(id));
        if (!concern) throw new Error("Concern not found");

        const contract = await this._contractRepository.findById(concern.contractId);
        if (!contract) throw new Error("Contract not found");

        const job = await this._jobRepository.findById(contract.jobId);
        if (!job) throw new Error("Job associated with contract not found");

        const targetUserId = receiver === 'client' ? job.clientId : contract.freelancerId;
        if (!targetUserId) throw new Error(`Target user ID for ${receiver} not found`);

        const wallet = await this._walletRepository.findByUserId(targetUserId);
        if (!wallet || !wallet._id) throw new Error(`Wallet for ${receiver} not found`);

        const amount = concern.amount;
        const newBalance = wallet.balance + amount;

        const newTransaction: IWalletTransaction = {
            type: "credit",
            amount: amount,
            description: `Dispute payment resolved for contract ${contract._id}`,
            createdAt: new Date()
        };

        wallet.balance = newBalance;
        wallet.transactions = [
            ...(wallet.transactions || []),
            newTransaction
        ];

        await this._walletRepository.update(wallet._id, wallet);

        concern.status = "resolved";
        await this._concernRepository.update(concern._id!, concern);

        const milestone = await this._milestoneRepository.findById(concern.milestoneId);
        if (milestone) {
            milestone.status = "released";
            await this._milestoneRepository.update(milestone._id!, milestone);
        }

        return { success: true };
    }
}
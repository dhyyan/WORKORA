import { Escrow } from "../../../domain/entities/escrow.entity";
import { BaseEscrowOutputDtos, MilestoneFundInputDtos, MilestoneFundOutputDtos } from "../../../domain/interface/DTOs/client/escrowDtos";
import { IEscrowRepository } from "../../../domain/interface/repositoryInterface/IEscrowRepository";
import { IMilestoneRepository } from "../../../domain/interface/repositoryInterface/IMilestoneRepository";
import { IEscrowFundUseCase } from "../../../domain/interface/useCaseInterface/client/escrow/iEscrowFundUseCase";

export class EscrowFundUseCase implements IEscrowFundUseCase {
    private _escrowRepository: IEscrowRepository;
    private _milestoneRepository: IMilestoneRepository;
    constructor(escrowRepository: IEscrowRepository, milestoneRepository: IMilestoneRepository) {
        this._escrowRepository = escrowRepository;
        this._milestoneRepository = milestoneRepository;
    }
    async createEscrow(input: MilestoneFundInputDtos): Promise<MilestoneFundOutputDtos> {
        const ifMilestoneExist = await this._milestoneRepository.findById(input.id)
        if (!ifMilestoneExist || !ifMilestoneExist?._id) throw new Error("Milestone not found")
        const data: Escrow = {
            milestoneId: ifMilestoneExist._id,
            amount: ifMilestoneExist.amount,
            status: "locked"
        }
        const createEscrow = await this._escrowRepository.create({ ...data })
        if (!createEscrow || !createEscrow._id) throw new Error("Failed to create escrow")

        const escrow: BaseEscrowOutputDtos = {
            _id: createEscrow._id!,
            milestoneId: createEscrow.milestoneId,
            amount: createEscrow.amount.toString(),
            status: "locked",
            createdAt: createEscrow.createdAt
        }

        // Update milestone status to funded
        await this._milestoneRepository.update(ifMilestoneExist._id, { status: "funded" });

        return { escrow }
    }
}
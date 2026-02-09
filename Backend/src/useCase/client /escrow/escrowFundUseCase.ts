import { Escrow } from "../../../domain/entities/escrow.entity";
import { IMilestone } from "../../../domain/entities/milestone.entity";
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
        try {
            const ifMilestoneExist = await this._milestoneRepository.findById(input.id)
            if (!ifMilestoneExist || !ifMilestoneExist?._id) throw new Error("Milestone not found")
            const data: Escrow = {
                milestoneId: ifMilestoneExist._id,
                amount: ifMilestoneExist.amount,
                status: "locked"
            }
            const createEscrow = await this._escrowRepository.create({ ...data })
            if (!createEscrow || !createEscrow._id) throw new Error("Failed to create escrow")

                const escrow:BaseEscrowOutputDtos={
                    _id:createEscrow._id,
                    milestoneId:createEscrow.milestoneId,
                    amount:createEscrow.amount.toString(),
                    status:"locked",
                    createdAt:createEscrow.createdAt
                }
                return {escrow}

        } catch (error) {
            throw new Error((error as Error).message)
        }
    }
}
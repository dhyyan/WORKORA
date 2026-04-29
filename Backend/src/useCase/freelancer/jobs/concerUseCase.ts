import { IConcerInputDtos, IConcerOutputDtos } from "../../../domain/interface/DTOs/client/JobDto";
import { IConcernUseCase } from "../../../domain/interface/useCaseInterface/freelancer/jobs/IConcernUseCase";
import { IConcernRepository } from "../../../domain/interface/repositoryInterface/IConcerRepository";
import { IContractRepository } from "../../../domain/interface/repositoryInterface/IContractRepository";

export class ConcernUseCase implements IConcernUseCase {
    private _concernRepository: IConcernRepository
    private _contractRepository: IContractRepository
    constructor(concernRepository: IConcernRepository, contractRepository: IContractRepository) {
        this._concernRepository = concernRepository
        this._contractRepository = contractRepository
    }
    async create(input: IConcerInputDtos): Promise<IConcerOutputDtos> {
        try {
            const contract = await this._contractRepository.findById(input.contractId)
            if (!contract) {
                throw new Error("Contract not found")
            }
            const concern = await this._concernRepository.create({ 
                contractId: input.contractId, 
                milestoneId: input.milestoneId,
                description: input.description, 
                amount: input.amount, 
                status: "pending" 
            })
            console.log("concern created", concern)
            return concern as IConcerOutputDtos
        } catch (error) {
            throw error
        }
    }
}







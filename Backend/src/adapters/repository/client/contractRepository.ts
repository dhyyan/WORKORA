import { IContract } from "../../../domain/entities/contract.entity";
import { IContractRepository } from "../../../domain/interface/repositoryInterface/IContractRepository";
import { contractModel } from "../../../frameWork/database/models/contract.model";
import { BaseRepository } from "../BaseRepo/baseRepository";

export class ContractRepository extends BaseRepository<IContract> implements IContractRepository {
    constructor(){
            super (contractModel)
        }  
    findContractByJobId(jobId: string): Promise<IContract | null> {
        return contractModel.findOne({jobId})
    }
}
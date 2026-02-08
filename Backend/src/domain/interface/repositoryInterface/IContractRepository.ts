import { IContract } from "../../entities/contract.entity";
import { IBaseRepository } from "./IBaseRepository";

export interface IContractRepository extends IBaseRepository<IContract>{
    findContractByJobId(jobId:string):Promise<IContract | null>
}
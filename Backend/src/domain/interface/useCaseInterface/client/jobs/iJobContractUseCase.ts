import { JobContractInputDtos, JobContractOutPutDtos } from "../../../DTOs/client/JobDto";

export interface IJobContractUseCase{
    contractDetails(input:JobContractInputDtos):Promise<JobContractOutPutDtos>
}
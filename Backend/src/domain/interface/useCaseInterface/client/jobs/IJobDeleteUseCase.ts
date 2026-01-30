import { JobDeleteInputDtos, JobDeleteOutputDtos } from "../../../DTOs/client/JobDto";

export interface IJobDeleteUseCase{
    deleteJob(input:JobDeleteInputDtos):Promise<JobDeleteOutputDtos>
}
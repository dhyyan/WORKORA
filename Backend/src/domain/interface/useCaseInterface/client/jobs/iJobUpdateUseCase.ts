import { JobUpdateInputDtos, JobUpdateOutputDtos } from "../../../DTOs/client/JobDto";

export interface IJobUpdateUseCase{
    updateJob(input:JobUpdateInputDtos):Promise<JobUpdateOutputDtos>
}
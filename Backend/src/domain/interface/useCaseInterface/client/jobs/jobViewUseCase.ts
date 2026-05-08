import { JobViewInputDtos, JobViewOutputDtos } from "../../../DTOs/client/JobDto";

export interface IJobViewUseCase{
    viewJob(input:JobViewInputDtos):Promise<JobViewOutputDtos>
}
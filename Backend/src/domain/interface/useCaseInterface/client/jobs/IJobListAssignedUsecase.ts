import { JobListAssignInputDtos, JobListAssignOutputDtos } from "../../../DTOs/client/JobDto";

export interface IJobListAssignedUseCase{
    listJobs(input:JobListAssignInputDtos):Promise<JobListAssignOutputDtos[]>
}
import { JobListInputDtos, JobListOutPutDtos } from "../../../DTOs/client/JobDto";

export interface IJobListUseCase {
    listJobs(input:JobListInputDtos):Promise<JobListOutPutDtos>
}
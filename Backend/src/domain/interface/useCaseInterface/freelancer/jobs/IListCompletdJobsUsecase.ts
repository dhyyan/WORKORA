import { ListCompletedJobsInputDtos, ListCompletedJobsOuputDtos } from "../../../DTOs/freelancer/JobDtos";

export interface IListCompletedJobs{
    listJobs(input:ListCompletedJobsInputDtos):Promise<ListCompletedJobsOuputDtos>
}
import { ListAcceptJobInputDtos, ListAcceptJobOutputDtos, ListCompletedJobsInputDtos, ListCompletedJobsOuputDtos } from "../../../DTOs/freelancer/JobDtos";

export interface IListAcceptJobUseCase{
    listJobs(input:ListCompletedJobsInputDtos):Promise<ListCompletedJobsOuputDtos>
}
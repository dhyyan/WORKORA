import { freelancerAxios } from "../../../axios/interceptors";
import type { SubmitMiestone } from "../../../types/client/milestone/IMilestone";

export const submitMilestoneService = async (data: SubmitMiestone) => {
    try {
        const response = await freelancerAxios.post(`/freelancer/milestone/sumbmit/${data.milestoneId}`, data)
        return response.data
    } catch (error) {
        console.log("error in submit milestone usecase", error)
    }
}

export const createConcernService = async (data: { contractId: string, description: string, amount: number, milestoneId: string }) => {
    try {
        const response = await freelancerAxios.post("/freelancer/concern", data)
        return response.data
    } catch (error) {
        console.log("error in create concern service", error)
        throw error
    }
}
import { freelancerAxios } from "../../../axios/interceptors"

export const fetchJobs = async () => {
    try {
        const response = await freelancerAxios.get("/freelancer/joblist")
        return response.data
    } catch (error) {
        console.log("error in job list service", error)
    }
}


export const fetchJobById = async (id: string) => {
    try {
        const response = await freelancerAxios.get(`/freelancer/job/${id}`)
        return response.data
    } catch (error) {
        console.log("error in fetching job details", error)
        throw error
    }
}
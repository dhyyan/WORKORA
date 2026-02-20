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

export const fetchBids=async(freelanceId:string)=>{
    try {
        const response=await freelancerAxios.get(`/freelancer/list/bids/${freelanceId}`)
        console.log("response in service",response)
        return response.data
    } catch (error) {
        console.log("error in bid list service", error)
    }
}


export const fetchAcceptedJobs=async(freelanceId:string)=>{
    try {
        const response=await freelancerAxios.get(`/freelancer/list/accept/jobs/${freelanceId}`)
        return response.data
    } catch (error) {
        console.log("error in job accepted list service", error)
    }
}

export const fetchCompletedJobs=async(freelanceId:string)=>{
    try {
        const response=await freelancerAxios.get(`/freelancer/list/completed/jobs/${freelanceId}`)
        return response.data
    } catch (error) {
        console.log("error in job completed list service", error)
    }
}
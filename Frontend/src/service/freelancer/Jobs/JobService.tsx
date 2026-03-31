import { freelancerAxios } from "../../../axios/interceptors"

export const fetchJobs = async (
    category: string[] = [],
    skills: string[] = [],
    price: [number, number] = [0, 0],
    page: number = 1,
    limit: number = 10,
    search: string = ""
) => {

    try {

        const params: Record<string, string | number> = {
            page,
            limit
        }

        // arrays → send only if exists
        if (category.length) params.category = category.join(",")
        if (skills.length) params.skills = skills.join(",")

        // price range
        if (price[0]) params.minPrice = price[0]
        if (price[1]) params.maxPrice = price[1]

        // search keyword
        if (search.trim()) params.search = search.trim();

        const response = await freelancerAxios.get(
            "/freelancer/joblist",
            { params }
        )

        return response.data

    } catch (error) {
        console.log("error in job list service", error)
        throw error
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

export const fetchBids = async (freelanceId: string) => {
    try {
        const response = await freelancerAxios.get(`/freelancer/list/bids/${freelanceId}`)
        console.log("response in service", response)
        return response.data
    } catch (error) {
        console.log("error in bid list service", error)
    }
}


export const fetchAcceptedJobs = async (freelanceId: string) => {
    try {
        const response = await freelancerAxios.get(`/freelancer/list/accept/jobs/${freelanceId}`)
        return response.data
    } catch (error) {
        console.log("error in job accepted list service", error)
    }
}

export const fetchCompletedJobs = async (freelanceId: string) => {
    try {
        const response = await freelancerAxios.get(`/freelancer/list/completed/jobs/${freelanceId}`)
        return response.data
    } catch (error) {
        console.log("error in job completed list service", error)
    }
}

//milestone service

export const milestoneListService = async ({ jobId }: { jobId: string }) => {
    try {
        console.log("Calling milestoneListService with jobId:", jobId);
        const response = await freelancerAxios.get(`/client/milestone/${jobId}`)
        console.log("milestoneListService response:", response.data);
        return response.data
    } catch (error) {
        console.error("milestone list error: in service", error);
        throw error;
    }
}
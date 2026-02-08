import { clientAxios } from "../../../axios/interceptors";
import type { HireFreelancerInput } from "../../../types/client/bid/IBid";

export const listBidsByProject = async (projectId: string) => {
    try {
       const response=await clientAxios.get(`/client/bids/${projectId}`);
         return response.data.bids;
    } catch (error) {
        console.error('Error fetching bids:', error);
        throw error;
    }
}

export const hireFreelancerService=async({jobId,bidId,freelancerId,totalAmount}:HireFreelancerInput)=>{
    try {
        console.log("mwoleeeeeeeeyeee")
        console.log("ammount in service",totalAmount)
        const response=await clientAxios.post("/client/hirefreelancer",{
            jobId,bidId,freelancerId,totalAmount
        })
        return response.data
    } catch (error) {
        console.error('Error while hiring freelancer:', error);
        throw error;
    }
}
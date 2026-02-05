import { clientAxios } from "../../../axios/interceptors";

export const listBidsByProject = async (projectId: string) => {
    try {
       const response=await clientAxios.get(`/client/bids/${projectId}`);
         return response.data.bids;
    } catch (error) {
        console.error('Error fetching bids:', error);
        throw error;
    }
}
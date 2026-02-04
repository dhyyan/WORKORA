import { freelancerAxios } from "../../../axios/interceptors";
import type { IBid } from "../../../types/freelancer/bid/IBid";

export const createBidService = async (bidData:IBid) => {
    try {
        const response = await freelancerAxios.post("/freelancer/createbid", bidData);
        return response.data;
    } catch (error) {
        console.error("Error in createBidService:", error);
        throw error;
    }
};
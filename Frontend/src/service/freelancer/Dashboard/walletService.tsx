import { freelancerAxios } from "../../../axios/interceptors";

export const getWallet = async (userId: string, page: number = 1, limit: number = 5) => {
    try {
        const response = await freelancerAxios.get(`/freelancer/wallet/${userId}?page=${page}&limit=${limit}`);
        return response.data;
    } catch (error) {
        console.error("fetch wallet error:", error);
        throw error;
    }
}

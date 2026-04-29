import { clientAxios } from "../../../axios/interceptors";

export const getWalletData = async (userId: string, page: number = 1, limit: number = 5) => {
    try {
        const response = await clientAxios.get(`/client/wallet/${userId}`, {
            params: { page, limit }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching wallet data:", error);
        throw error;
    }
};

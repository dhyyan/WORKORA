import { clientAxios, freelancerAxios } from "../../axios/interceptors";

export const createSubscriptionSession = async (role: 'client' | 'freelancer') => {
    try {
        const axiosInstance = role === 'client' ? clientAxios : freelancerAxios;
        const response = await axiosInstance.post(`/${role}/subscription`);
        return response.data;
    } catch (error: unknown) {
        const err = error as { response?: { data?: { message?: string } } };
        console.error("Error creating subscription session:", err);
        throw err;
    }
};

import { adminAxios } from "../../axios/interceptors";

export const getSubscriptionRevenue = async () => {
    try {
        const response = await adminAxios.get("/admin/subscriptions");
        return response.data;
    } catch (error) {
        throw error;
    }
};

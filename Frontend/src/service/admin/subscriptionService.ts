import { adminAxios } from "../../axios/interceptors";

export const getSubscriptionRevenue = async () => {
    const response = await adminAxios.get("/admin/subscriptions");
    return response.data;
};

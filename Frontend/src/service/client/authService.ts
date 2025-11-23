//login service

//login service
import { clientAxios } from "../../axios/interceptors";

import type { LoginFormInputs } from "../../types/client/auth/Tlogin"
import type { ISignUp } from "../../types/client/auth/ISignUp"

export const clientLoginService = async ({ email, password }: LoginFormInputs) => {
    try {
        const response = await clientAxios.post('/client/login', {
            email,
            password
        });

        console.log("Login response:", response.data);
        return response?.data;

    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
};
export const clientSignUpService = async ({ name, email, phone, password }: ISignUp) => {
    try {
        const response = await clientAxios.post("/client/signup", {
            name,
            email,
            phone,
            password
        })

        return response?.data
    } catch (error) {
        console.error("signUp error:", error);
        throw error;
    }
}
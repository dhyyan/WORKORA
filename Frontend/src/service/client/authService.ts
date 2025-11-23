//login service

//login service
import { clientAxios } from "../../axios/interceptors";

import type { LoginFormInputs } from "../../types/client/auth/Tlogin"

export const clientLoginService=async({email,password}:LoginFormInputs)=>{
try {
    const response=await clientAxios.post('/client/login',{email,password})
    console.log("login response",response.data)
    
    return response?.data
} catch (error) {
    console.log(error)
}
}
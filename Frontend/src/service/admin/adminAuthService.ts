import { admintAxios } from "../../axios/interceptors"
import type { LoginFormInputs } from "../../types/auth/Tlogin"

export const adminLoginService=async({email,password}:LoginFormInputs)=>{
    
    try {
        const response = await admintAxios.post("/admin/login",{
            
            email,
            password
        })

        return response.data
    } catch (error) {

        console.log(error)
    }

    }
import { clientAxios } from "../../../axios/interceptors"

export const getUserDetails=async({userId}: { userId: string })=>{
    try {
        console.log("refresh service called",userId)
        const respone=await clientAxios.get(`client/userdata/${userId}`)
        console.log("refresh service response",respone.data)
        return respone.data
    } catch (error) {
          console.error("update profile error:", error);
        throw error;
    }
}
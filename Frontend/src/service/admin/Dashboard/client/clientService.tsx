import { clientAxios } from "../../../../axios/interceptors"

export const listClients=async ()=>{

    try {
        const response =await clientAxios.get("/admin/listclient")
        return  response.data
    } catch (error) {
        console.log("error in admin list user",error)
    }
}
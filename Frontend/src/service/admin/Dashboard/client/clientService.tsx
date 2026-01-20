import { admintAxios } from "../../../../axios/interceptors"

export const listClients=async ()=>{

    try {
        const response =await admintAxios.get("/admin/listclient")
        return  response.data
    } catch (error) {
        console.log("error in admin list user",error)
    }
}

export const blockUser=async({id,isBlocked}:{id:string,isBlocked:boolean})=>{
    try {
        console.log("id recei",id,isBlocked)
        const response=await admintAxios.patch(`/admin/block/${id}`,{
            isBlocked
        })
        return response.data
    } catch (error) {
        console.log("error in block user",error)
    }
}
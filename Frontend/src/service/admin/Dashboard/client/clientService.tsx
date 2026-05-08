import { adminAxios, clientAxios } from "../../../../axios/interceptors"

export const listClients=async (page:number=1,limit:number=10,search:string)=>{

    try {
       const params: Record<string, string | number> = {
            page,
            limit
        }

        if(search.trim())params.search=search.trim()
        const response =await adminAxios.get("/admin/listclient",{params})
        console.log("response",response.data)
        return  response.data
    } catch (error) {
        console.log("error in admin list user",error)
    }
}

export const blockUser=async({id,isBlocked}:{id:string,isBlocked:boolean})=>{
    try {
        console.log("id recei",id,isBlocked)
        const response=await adminAxios.patch(`/admin/block/${id}`,{
            isBlocked
        })
        return response.data
    } catch (error) {
        console.log("error in block user",error)
    }
}

//list milestone
export const listMilestoneService=async(page:number,limit:number)=>{
    try {
        const params: Record<string, string | number> = {
            page,
            limit
        }
    const response=await clientAxios.get("admin/list/milestone",{params})
    return response.data
    } catch (error) {
        console.log("error in list milestone",error)
    }
}

//relesepayment

export const relesePaymentService=async(id:string)=>{
    try {
        const response=await adminAxios.post(`/admin/relesepayment/${id}`)
        return response.data
    } catch (error) {
        console.log("error in relese payment",error)
    }
}

//category
export const categoryService=async(name:string)=>{
    try {
        const respose=await adminAxios.post("/admin/categories",{name})
        return respose.data
    } catch (error) {
        console.log("error in create category",error)
    }
}

export const listCategoryService=async()=>{
    try {
        const response=await adminAxios.get("/admin/categories")
        return response.data
    } catch (error) {
        console.log("error in list category",error)
    }
}

export const toggleCategoryStatusService=async(id:string)=>{
    try {
        const response=await adminAxios.patch(`/admin/categories/status/${id}`)
        return response.data
    } catch (error) {
        console.log("error in toggle category status",error)
    }
}

//concerns
export const listConcernService=async(p: number = 1, l: number = 5)=>{
    try {
        const response=await adminAxios.get("/admin/concern", { params: { page: p, limit: l } })
        return response.data
    } catch (error) {
        console.log("error in list concern",error)
    }
}

export const releaseConcernPaymentService=async(id: string, receiver: 'client' | 'freelancer')=>{
    try {
        const response=await adminAxios.post(`/admin/concern/release/${id}`, { receiver })
        return response.data
    } catch (error) {
        console.log("error in release concern payment",error)
    }
}
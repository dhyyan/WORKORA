import { clientAxios } from "../../../axios/interceptors"

export const paymentMilestone=async(milestoneId:string)=>{
    try {
        console.log("payment checkout service called")
        const response=await clientAxios.post("/client/payment/checkout",{
            milestoneId
        })
        console.log("response",response)
        return response.data
    } catch (error) {
        console.log("error in paymentmilestone service",error)
    }
}
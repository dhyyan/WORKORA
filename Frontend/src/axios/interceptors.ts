import axios from "axios"
import store from "../store/store"

console.log("evvvvvv", import.meta.env.VITE_API_BASEURL)
// import {clientAddToken} from "../store/slice/client/clientTokenSlice"

const createAxiosInstance=(type:"client"|"freelancer"|"admin")=>{
    const axiosInstance=axios.create({
        baseURL:import.meta.env.VITE_API_BASEURL,
        withCredentials:true
    })

    axiosInstance.interceptors.request.use(

        (config)=>{

            let token=null
            if(type=="client"){
                token=store.getState().clientToken.token
            }

            if(token){
                config.headers.Authorization=`Bearer ${token}`
            }

            return config
        },

        (error)=>Promise.reject(error)

    )
    
    return axiosInstance;
}


export const clientAxios= createAxiosInstance("client")
export const freelancerAxios= createAxiosInstance("freelancer")
export const admintAxios= createAxiosInstance("admin")
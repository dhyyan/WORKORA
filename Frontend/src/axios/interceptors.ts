import axios from "axios"
import store from "../store/store"
import { removeToken } from "../store/slice/client/clientTokenSlice"
import { freelancerRemoveToken } from "../store/slice/freelancer/FreelancerToken"
import toast from "react-hot-toast"
import { removeClient } from "../store/slice/client/clientSlice"
import { removeFreelancer } from "../store/slice/freelancer/FreelanceSlice"

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
            }else if(type=="freelancer"){
                token=store.getState().freelancerToken.token
            }

            if(token){
                config.headers.Authorization=`Bearer ${token}`
            }

            return config
        },

        (error)=>Promise.reject(error)

    )

     // RESPONSE INTERCEPTOR
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      const status = error?.response?.status;
      const message = error?.response?.data?.message;

      if (
        status === 401 &&
        message === "user is blocked by admin"
      ) {
        if (type === "client") {
          store.dispatch(removeToken());
          store.dispatch(removeClient())
          window.location.href = "/client/login";
          toast.error("user was blocked by admin")
        }

        if (type === "freelancer") {
          store.dispatch(freelancerRemoveToken());
          store.dispatch(removeFreelancer())
          window.location.href = "/freelancer/login";
          toast.error("user was blocked by admin")
        }
      }

      return Promise.reject(error);
    }
  );
    
    return axiosInstance;
}


export const clientAxios= createAxiosInstance("client")
export const freelancerAxios= createAxiosInstance("freelancer")
export const admintAxios= createAxiosInstance("admin")
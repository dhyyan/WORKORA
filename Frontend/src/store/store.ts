import { configureStore } from "@reduxjs/toolkit";
import clientReducer from "./slice/client/clientSlice"
import clientTokenReducer from "./slice/client/clientTokenSlice"
import  freelancerReducer  from "./slice/freelancer/FreelanceSlice";
import freelancerToken from "./slice/freelancer/FreelancerToken";
import  adminReducer  from "./slice/admin/AdminSlice";
import adminToken  from "./slice/admin/AdminTokenSlice";
const store= configureStore({
    reducer:{
        clientAuth:clientReducer,
        clientToken:clientTokenReducer,
        freelancerAuth:freelancerReducer,
        freelancerToken:freelancerToken,
        admintAuth:adminReducer,
        admimToken:adminToken
    


    }
})

export default store
// types
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
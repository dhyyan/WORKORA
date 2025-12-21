import { configureStore } from "@reduxjs/toolkit";
import clientReducer from "./slice/client/clientSlice"
import clientTokenReducer from "./slice/client/clientTokenSlice"
import  freelancerReducer  from "./slice/freelancer/FreelanceSlice";
import freelancerToken from "./slice/freelancer/FreelancerToken";

const store= configureStore({
    reducer:{
        clientAuth:clientReducer,
        clientToken:clientTokenReducer,
        freelancerAuth:freelancerReducer,
        freelancerToken:freelancerToken
    


    }
})

export default store
// types
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
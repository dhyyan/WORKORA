import { createSlice } from "@reduxjs/toolkit";
import type { IFreelancer } from "../../../types/freelancer/Ifreelancer";


const initialState:{freelancer:IFreelancer|null}={
    freelancer: null
}
const freelanceSlice=createSlice({
    name:"freelanceSlice",
    initialState,
    reducers:{
        addFreelancer:(state,action)=>{
            state.freelancer=action.payload
        },
        removeFreelancer:(state)=>{
            state.freelancer=null
        }
    }
})

export const {addFreelancer,removeFreelancer}=freelanceSlice.actions
export default freelanceSlice.reducer
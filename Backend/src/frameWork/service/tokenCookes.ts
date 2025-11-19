import { Response } from "express";

export const setCookie=(res:Response,refreshToken:string)=>{
    res.cookie('refreshToken',refreshToken,{
        httpOnly:true,
        secure:false,
        maxAge:7*24*60*1000
    })
}
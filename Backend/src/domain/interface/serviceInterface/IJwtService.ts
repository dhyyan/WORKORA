import { DecodeTockenEntity } from "../../entities/decodeTokenEntities"

export interface IJwtService{
    createAccessToken(accessSecreKey:string,userId:string,role:string):string 
    createRefreshToken(refreshSecretKey:string,userId:string):string
    verifyAccessToken(accessToken:string,accessSecretKey:string):any
    verifyRefreshToken(refreshToken:string,refreshSecretKey:string): { userId: string } | null;
    tokenDecode(accessToken:string):DecodeTockenEntity|null
}
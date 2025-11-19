import jwt from "jsonwebtoken"
import { DecodeTockenEntity } from "../../domain/entities/decodeTokenEntities";
import { IJwtService } from "../../domain/interface/serviceInterface/IJwtService";

export class JwtService implements IJwtService{
    
    
    tokenDecode(accessToken: string): DecodeTockenEntity | null {
        return jwt.decode(accessToken) as DecodeTockenEntity
    }

    createAccessToken(accessSecreKey: string, userId: string, role: string): string {
        return jwt.sign({userId,role},accessSecreKey,{expiresIn:"1d"})
    }


    createRefreshToken(refreshSecretKey: string, userId: string): string {
        return jwt.sign({userId},refreshSecretKey,{expiresIn:"1d"})
    }

    
    verifyAccessToken(accessToken: string, accessSecretKey: string): any {
       try {
            return jwt.verify(accessToken, accessSecretKey) as { userId: string, role: string }
        } catch (error) {
            console.log('error while verify AccessToken ', error)
            return null
        }
    }
    verifyRefreshToken(refreshToken: string, refreshSecretKey: string):  { userId: string } | null {
        try {
            return jwt.verify(refreshToken, refreshSecretKey) as { userId: string }
        } catch {
            return null
        }
    }


}
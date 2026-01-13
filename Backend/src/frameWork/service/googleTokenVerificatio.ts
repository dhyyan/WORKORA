import { OAuth2Client } from "google-auth-library";
import axios from "axios";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

interface GoogleUserInfo {
    email: string;
    name: string;
    picture: string;
    sub: string;
    email_verified: boolean;
}

export const verifyGoogleToken = async (token: string) => {
    try {
       
        const ticket = await googleClient.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        return ticket.getPayload();
    } catch (error) {
        console.log("ID Token verification failed, trying Access Token...", error);

        try {
            const response = await axios.get<GoogleUserInfo>("https://www.googleapis.com/oauth2/v3/userinfo", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const userData = response.data;
            
            return {
                email: userData.email,
                name: userData.name,
                picture: userData.picture,
                sub: userData.sub,
                email_verified: userData.email_verified
            };

        } catch (accessTokenError) {
            console.error("Access Token verification also failed:", accessTokenError);
            throw new Error("Invalid Google Token");
        }
    }
};
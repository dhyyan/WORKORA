import NodeCache from "node-cache";
import { IOtpService } from "../../domain/interface/serviceInterface/IOtpService";

export class OtpSerrvice implements IOtpService {
    private _cache: NodeCache
    constructor() {
        this._cache = new NodeCache({ stdTTL: 60 });
    }
    generateOtp(): string {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    async storeOtp(email: string, otp: string): Promise<void> {
        const existingOtp = this._cache.get(email);

        if (!existingOtp) {
            this._cache.set(email, otp, 60);
        }
    }

    async resendOtp(email: string): Promise<string> {
        const otp = this.generateOtp();
        this._cache.set(email, otp, 60); // overwrite allowed in resend
        return otp;
    }


    async verifyOtp(email: string, otp: string): Promise<boolean> {
        console.log(email, otp, 'emailotp form verify')
        const cachedOtp = this._cache.get(email);
        console.log(cachedOtp, 'cachedOtp',"my otp",otp)
        if (cachedOtp && cachedOtp == otp) {
            console.log("hy fahaddd")
            this._cache.del(email);
            console.log("otp matched")
            return true;
        }
        console.log("fake fahad")
        return false;
    }
}
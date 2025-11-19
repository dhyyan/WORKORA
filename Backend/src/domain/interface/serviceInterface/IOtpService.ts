export interface IOtpService {
    generateOtp(): string,
    storeOtp(email: string, otp: string): Promise<void>
    verifyOtp(email: string, otp: string): Promise<boolean>
}
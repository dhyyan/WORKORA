export interface IVerifyOtpUseCase {
    verify(email: string, otp: string): Promise<boolean>
}
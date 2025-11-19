export interface ISendOtpUseCase {
    excute(email: string): Promise<{ message: string, success: boolean }>
}
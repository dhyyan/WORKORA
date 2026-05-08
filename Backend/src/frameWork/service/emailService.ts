import nodemailer from 'nodemailer'
import { IEmailService } from '../../domain/interface/serviceInterface/IEmailService';
import { otpTemplate } from '../../shared/templates/otpTemplate';


export class EmailService implements IEmailService {
    private _transporter: nodemailer.Transporter;

    constructor() {
        console.log(process.env.EMAIL,process.env.PORT)
        this._transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {

                user: process.env.EMAIL,
                pass: process.env.PASS
            }
        })
    }
    async sendOtp(email: string, otp: string): Promise<void> {
        console.log("sending otp",otp)
        const mailOption = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Your OTP Code',
            html: otpTemplate(otp)
        };
        try {
            await this._transporter.sendMail(mailOption)
            console.log(`otp sended to ${email}`)
        } catch (error) {
            console.log('error while sending otp', error)
            throw new Error('failed to send otp', { cause: error })
        }
    }
}
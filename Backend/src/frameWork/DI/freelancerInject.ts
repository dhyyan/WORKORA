import { FreelancerChagePassController } from "../../adapters/controllers/freelancer/Auth/freelancerChangePassword";
import { FreelancerForgotPassOtpController } from "../../adapters/controllers/freelancer/Auth/freelancerForgotPassOtpController";
import { FreelancerForgotPassController } from "../../adapters/controllers/freelancer/Auth/freelancerFrogotPassController";
import { FreelancerLoginController } from "../../adapters/controllers/freelancer/Auth/freelancerLoginController";
import { FreelancerSentOtpController } from "../../adapters/controllers/freelancer/Auth/freelancerOtpController";
import { FreelancerResendOtpController } from "../../adapters/controllers/freelancer/Auth/freelancerResendOtpController";
import { FreelancerVerifyOtpController } from "../../adapters/controllers/freelancer/Auth/freelancerVerifyOtpController";
import { ClientRepository } from "../../adapters/repository/client/clientRepository";
import { FreelancerRepository } from "../../adapters/repository/freelancer/freelancerRepository";
import { FreelancerChangePassUseCase } from "../../useCase/freelancer/auth/login/freelancerChangePassUseCase";
import { FreelancerForgotPassOtpUseCase } from "../../useCase/freelancer/auth/login/freelancerForgotPassOtpUseCase";
import { FreelancerForgotPassUseCase } from "../../useCase/freelancer/auth/login/freelancerForgotPassUseCase";
import { FreelancerLoginUseCase } from "../../useCase/freelancer/auth/login/freelancerLoginUseCase";
import { FreelacerRegisterUseCase } from "../../useCase/freelancer/auth/register/freelancerRegisterUseCase";
import { FreelancerResendOtpUseCase } from "../../useCase/freelancer/auth/register/freelancerResendOtpUseCase";
import { FreelancerSentOtpUseCase } from "../../useCase/freelancer/auth/register/freelancerSentOtpUseCase";
import { FreelancerVerifyOtpUseCase } from "../../useCase/freelancer/auth/register/freelancerVerifyOtpUseCase";
import { EmailService } from "../service/emailService";
import { HashPasswordService } from "../service/hashPasswordService";
import { JwtService } from "../service/jwtService";
import { OtpSerrvice } from "../service/otpService";


//signup
const freelancerRepository=new FreelancerRepository()
const clientRepository=new ClientRepository()
const otpService=new OtpSerrvice()
const emailService=new EmailService()
const freelancerVerifyOtpUseCase=new FreelancerVerifyOtpUseCase(freelancerRepository,clientRepository,otpService)
const freelancerSendOtpUseCase=new FreelancerSentOtpUseCase(freelancerRepository,clientRepository,otpService,emailService)
const hashPassword=new HashPasswordService()
const freelancerRegisterUseCase=new FreelacerRegisterUseCase(freelancerRepository,clientRepository,hashPassword)
export const freelancerSendOtpController=new FreelancerSentOtpController(freelancerSendOtpUseCase)
export const freelancerVerifyOtpController=new FreelancerVerifyOtpController(freelancerVerifyOtpUseCase,freelancerRegisterUseCase)


//login

const jwtService=new JwtService()
const freelancerLoginUseCase=new FreelancerLoginUseCase(freelancerRepository,hashPassword,jwtService)
export const freelancerLoginController=new FreelancerLoginController(freelancerLoginUseCase)

//resendOtp

const freelancerResendOtpUseCase=new FreelancerResendOtpUseCase(freelancerRepository,clientRepository,otpService,emailService)
export const freelancerResendOtpController= new FreelancerResendOtpController(freelancerResendOtpUseCase)

//forgot password

const freelancerForgotPassUseCase=new FreelancerForgotPassUseCase(freelancerRepository,clientRepository,otpService,emailService)
export const freelancerForgotPassController=new FreelancerForgotPassController(freelancerForgotPassUseCase)

// forgot pass otp check
const freelancerForgotPassOtpUseCase=new FreelancerForgotPassOtpUseCase(freelancerRepository,clientRepository,otpService)
export const freelancerForgotPassOtpController=new FreelancerForgotPassOtpController(freelancerForgotPassOtpUseCase)


//change Password

const freelancerChangePassUseCase=new FreelancerChangePassUseCase(freelancerRepository,clientRepository,hashPassword)
export const freelancerChangePassController= new FreelancerChagePassController(freelancerChangePassUseCase)
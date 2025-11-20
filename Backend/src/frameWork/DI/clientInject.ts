import { NewPasswordController } from "../../adapters/controllers/client/changePasswordController";
import { ClientLogin } from "../../adapters/controllers/client/clientLoginController";
import { SendOtpForgotPasswordController } from "../../adapters/controllers/client/forgotPasswordController";
import { SendOtpController } from "../../adapters/controllers/client/otpController";
import { ClientRegisterController } from "../../adapters/controllers/client/registerController";
import { ResendOtpController } from "../../adapters/controllers/client/resendOptController";
import { VerifyOtpPassword } from "../../adapters/controllers/client/verifyOtpForgotPasswordController";
import { ClientRepository } from "../../adapters/repository/client/clientRepository";
import { ClientLogiUseCase } from "../../useCase/client /auth/login/clientLoginUseCase";
import { ChangePassowrdUseCase } from "../../useCase/client /auth/password/changePasswordUseCase";
import { ForgotOtpPasswordUseCase } from "../../useCase/client /auth/password/forgotOtpPasswordUseCase";
import { ForgotPasswordUseCase } from "../../useCase/client /auth/password/ForgotPasswordUseCase";
import { RegisterClientUseCase } from "../../useCase/client /auth/register/clientRegisterUseCase";
import { ResendOtpUseCase } from "../../useCase/client /auth/register/resendOtpUseCase";
import { SendOtpClientUseCase } from "../../useCase/client /auth/register/sendOtpClientUseCase";
import { VerifyOtpUseCase } from "../../useCase/client /auth/register/verifyOtpUseCase";
import { EmailService } from "../service/emailService";
import { HashPasswordService } from "../service/hashPasswordService";
import { JwtService } from "../service/jwtService";
import { OtpSerrvice } from "../service/otpService";



//Register Client
const clientRepository = new ClientRepository()
const otpService = new OtpSerrvice()
const emailService = new EmailService()
const verifyOtpUseCase = new VerifyOtpUseCase(otpService)
const hashPasswordService = new HashPasswordService()
const registerClientUseCase = new RegisterClientUseCase(clientRepository, hashPasswordService)
const sendOtpClientUsecase = new SendOtpClientUseCase(clientRepository, otpService, emailService)
export const sendOtpController = new SendOtpController(sendOtpClientUsecase)
export const clientRegisterController = new ClientRegisterController(verifyOtpUseCase, registerClientUseCase)


//Login Client
const jwtService = new JwtService()
const clientLogiUseCase = new ClientLogiUseCase(hashPasswordService, clientRepository, jwtService)
export const clientLogin = new ClientLogin(clientLogiUseCase)

//ForgotPass
const forgotpasswordUseCase = new ForgotPasswordUseCase(clientRepository, otpService, emailService)
export const sendOtpForgotPasswordController = new SendOtpForgotPasswordController(forgotpasswordUseCase)

//ForgotPass Otp check

const forgotOtpPasswordUseCase=new ForgotOtpPasswordUseCase(clientRepository,otpService)
export const verifyOtpPassword= new VerifyOtpPassword(forgotOtpPasswordUseCase)

//new Pawssword

const changePassowrdUseCase= new ChangePassowrdUseCase(clientRepository,hashPasswordService)
export const newPasswordController=new NewPasswordController(changePassowrdUseCase)

//resendOtp

const resendOptUseCase= new ResendOtpUseCase(clientRepository,otpService,emailService)
export const resendOtpController=new ResendOtpController(resendOptUseCase)
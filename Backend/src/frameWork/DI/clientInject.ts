import { NewPasswordController } from "../../adapters/controllers/client/changePasswordController";
import { ClientGoogleController } from "../../adapters/controllers/client/clientGoogleAuthController";
import { ClientLogin } from "../../adapters/controllers/client/clientLoginController";
import { ClientDataController } from "../../adapters/controllers/client/Dashboard/Profile/clientData";
import { ClientProfileUpdateController } from "../../adapters/controllers/client/Dashboard/Profile/profileController";
import { SendOtpForgotPasswordController } from "../../adapters/controllers/client/forgotPasswordController";
import { JobController } from "../../adapters/controllers/client/Job/jobController";
import { JobListController } from "../../adapters/controllers/client/Job/jobListController";
import { SendOtpController } from "../../adapters/controllers/client/otpController";
import { ClientRegisterController } from "../../adapters/controllers/client/registerController";
import { ResendOtpController } from "../../adapters/controllers/client/resendOptController";
import { VerifyOtpPassword } from "../../adapters/controllers/client/verifyOtpForgotPasswordController";
import { ClientRepository } from "../../adapters/repository/client/clientRepository";
import { JobRepository } from "../../adapters/repository/client/jobRepository";
import { FreelancerRepository } from "../../adapters/repository/freelancer/freelancerRepository";
import { ClientLoginUseCase } from "../../useCase/client /auth/login/clientLoginUseCase";
import { GoogleAuthUseCase } from "../../useCase/client /auth/login/googleAuthUseCase";
import { ChangePassowrdUseCase } from "../../useCase/client /auth/password/changePasswordUseCase";
import { ForgotOtpPasswordUseCase } from "../../useCase/client /auth/password/forgotOtpPasswordUseCase";
import { ForgotPasswordUseCase } from "../../useCase/client /auth/password/ForgotPasswordUseCase";
import { RegisterClientUseCase } from "../../useCase/client /auth/register/clientRegisterUseCase";
import { ResendOtpUseCase } from "../../useCase/client /auth/register/resendOtpUseCase";
import { SendOtpClientUseCase } from "../../useCase/client /auth/register/sendOtpClientUseCase";
import { VerifyOtpUseCase } from "../../useCase/client /auth/register/verifyOtpUseCase";
import { ClientDataUseCasse } from "../../useCase/client /Dashboard/Profile/clientDataUseCase";
import { UpateProfileUseCase } from "../../useCase/client /Dashboard/Profile/UpdateProfileUseCase";
import { JobCreateUseCase } from "../../useCase/client /jobs/jobCreateUseCase";
import { JobListUseCase } from "../../useCase/client /jobs/jobListUseCase";
import { EmailService } from "../service/emailService";
import { HashPasswordService } from "../service/hashPasswordService";
import { JwtService } from "../service/jwtService";
import { OtpSerrvice } from "../service/otpService";



//Register Client
export const clientRepository = new ClientRepository()
const otpService = new OtpSerrvice()
const emailService = new EmailService()
const verifyOtpUseCase = new VerifyOtpUseCase(otpService)
const hashPasswordService = new HashPasswordService()
const freelancerRepo = new FreelancerRepository()
const registerClientUseCase = new RegisterClientUseCase(clientRepository, freelancerRepo, hashPasswordService)
const sendOtpClientUsecase = new SendOtpClientUseCase(clientRepository, otpService, emailService)
export const sendOtpController = new SendOtpController(sendOtpClientUsecase)
export const clientRegisterController = new ClientRegisterController(verifyOtpUseCase, registerClientUseCase)


//Login Client
export const jwtService = new JwtService()
const clientLoginUseCase = new ClientLoginUseCase(hashPasswordService, clientRepository, freelancerRepo, jwtService)
export const clientLogin = new ClientLogin(clientLoginUseCase)

//ForgotPass
const forgotpasswordUseCase = new ForgotPasswordUseCase(freelancerRepo, clientRepository, otpService, emailService)
export const sendOtpForgotPasswordController = new SendOtpForgotPasswordController(forgotpasswordUseCase)

//ForgotPass Otp check

const forgotOtpPasswordUseCase = new ForgotOtpPasswordUseCase(freelancerRepo, clientRepository, otpService)
export const verifyOtpPassword = new VerifyOtpPassword(forgotOtpPasswordUseCase)

//new Pawssword

const changePassowrdUseCase = new ChangePassowrdUseCase(freelancerRepo, clientRepository, hashPasswordService)
export const newPasswordController = new NewPasswordController(changePassowrdUseCase)

//resendOtp

const resendOptUseCase = new ResendOtpUseCase(clientRepository, otpService, emailService)
export const resendOtpController = new ResendOtpController(resendOptUseCase)

//updateProfile

const updateProfileUseCase = new UpateProfileUseCase(clientRepository)
export const clientProfileUpdateController = new ClientProfileUpdateController(updateProfileUseCase)

//googleAuth
const googleAuthUseCase = new GoogleAuthUseCase(freelancerRepo, clientRepository, jwtService)
export const clientGoogleController = new ClientGoogleController(googleAuthUseCase)


const clientDataUseCase=new ClientDataUseCasse(clientRepository)
export const clientDataController=new ClientDataController(clientDataUseCase)



//jobs 
const jobRepository=new JobRepository()
const jobCreateUseCase=new JobCreateUseCase(jobRepository)
export const jobCreateController=new JobController(jobCreateUseCase)

const jobListUseCase=new JobListUseCase(jobRepository)
export const jobListController=new JobListController(jobListUseCase)
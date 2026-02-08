import { NewPasswordController } from "../../adapters/controllers/client/changePasswordController";
import { ClientGoogleController } from "../../adapters/controllers/client/clientGoogleAuthController";
import { ClientLogin } from "../../adapters/controllers/client/clientLoginController";
import { ClientDataController } from "../../adapters/controllers/client/Dashboard/Profile/clientData";
import { ClientProfileUpdateController } from "../../adapters/controllers/client/Dashboard/Profile/profileController";
import { SendOtpForgotPasswordController } from "../../adapters/controllers/client/forgotPasswordController";
import { JobController } from "../../adapters/controllers/client/Job/jobController";
import { JobDeleteController } from "../../adapters/controllers/client/Job/jobDeleteController";
import { JobListController } from "../../adapters/controllers/client/Job/jobListController";
import { JobUpdateController } from "../../adapters/controllers/client/Job/jobUpdateController";
import { JobViewController } from "../../adapters/controllers/client/Job/jobViewController";
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
import { JobDeleteUseCase } from "../../useCase/client /jobs/jobDeleteUseCase";
import { JobListUseCase } from "../../useCase/client /jobs/jobListUseCase";
import { JobUpdateUseCase } from "../../useCase/client /jobs/jobUpdateUseCase";
import { JobViewUseCase } from "../../useCase/client /jobs/jobViewUseCase";
import { EmailService } from "../service/emailService";
import { HashPasswordService } from "../service/hashPasswordService";
import { JwtService } from "../service/jwtService";
import { OtpSerrvice } from "../service/otpService";
import { BidListUseCase } from "../../useCase/client /bid/bidListUseCase";
import { IBidRepository } from "../../domain/interface/repositoryInterface/IBidRepository";
import { BidRepository } from "../../adapters/repository/freelancer/bidRepository";
import { BidViewController } from "../../adapters/controllers/client/bid/bidViewController";
import { HireFreelancerUseCase } from "../../useCase/client /bid/hireFreelancerUseCase";
import { ContractRepository} from "../../adapters/repository/client/contractRepository";
import { HireFreelancerController } from "../../adapters/controllers/client/bid/hireFreelancerController";
import { MilestoneController } from "../../adapters/controllers/client/milestone/milestoneController";
import { MilestoneUseCase } from "../../useCase/client /milestone/milestoneUseCase";
import { MileStoneRepository } from "../../adapters/repository/client/milestoneRepository";
import { JobContractUseCase } from "../../useCase/client /jobs/jobContractUseCase";
import { JobContractController } from "../../adapters/controllers/client/Job/jobContractController";



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

//jobs list
const jobListUseCase=new JobListUseCase(jobRepository)
export const jobListController=new JobListController(jobListUseCase)

//job view
const jobViewUseCase=new JobViewUseCase(jobRepository)
export const jobViewController=new JobViewController(jobViewUseCase)

//update Job
const jobUpdateUseCase=new JobUpdateUseCase(jobRepository)
export const jobUpdateController=new JobUpdateController(jobUpdateUseCase)

//delete job

const jobDeleteUseCase=new JobDeleteUseCase(jobRepository)
export const jobDeleteController=new JobDeleteController(jobDeleteUseCase)

//bid list for client

const bidRepository:IBidRepository=new BidRepository()
const bidListUseCase=new BidListUseCase(bidRepository)
export const bidListController=new BidViewController(bidListUseCase)


//hire freelancer

const contractRepository=new ContractRepository()
const hireFreelancerUseCase=new HireFreelancerUseCase(contractRepository,freelancerRepo,bidRepository,jobRepository)
export const hireFreelancerController=new HireFreelancerController(hireFreelancerUseCase)


//milestone

const milestoneRepository=new MileStoneRepository()
const milestoneUseCase=new MilestoneUseCase(contractRepository,milestoneRepository)
export const milestoneController=new MilestoneController(milestoneUseCase)


//contract details
const jobContractUseCase=new JobContractUseCase(contractRepository,freelancerRepo)
export const jobContractController=new JobContractController(jobContractUseCase)    
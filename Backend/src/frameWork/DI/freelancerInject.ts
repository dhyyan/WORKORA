import { FreelancerChagePassController } from "../../adapters/controllers/freelancer/Auth/freelancerChangePassword";
import { FreelancerForgotPassOtpController } from "../../adapters/controllers/freelancer/Auth/freelancerForgotPassOtpController";
import { FreelancerForgotPassController } from "../../adapters/controllers/freelancer/Auth/freelancerFrogotPassController";
import { FreelancerLoginController } from "../../adapters/controllers/freelancer/Auth/freelancerLoginController";
import { FreelancerSentOtpController } from "../../adapters/controllers/freelancer/Auth/freelancerOtpController";
import { FreelancerResendOtpController } from "../../adapters/controllers/freelancer/Auth/freelancerResendOtpController";
import { FreelancerVerifyOtpController } from "../../adapters/controllers/freelancer/Auth/freelancerVerifyOtpController";
import { FreelancerDataController } from "../../adapters/controllers/freelancer/Dashboard/FreelancerDataController";
import { FreelancerUpdateProfileController } from "../../adapters/controllers/freelancer/Dashboard/UpdateProfileController";
import { ClientRepository } from "../../adapters/repository/client/clientRepository";
import { FreelancerRepository } from "../../adapters/repository/freelancer/freelancerRepository";
import { FreelancerGoogleController } from "../../adapters/controllers/freelancer/Auth/freelancerGoogleAuthController";
import { FreelancerGoogleAuthUseCase } from "../../useCase/freelancer/auth/login/freelancerGoogleAuthUseCase";
import { FreelancerChangePassUseCase } from "../../useCase/freelancer/auth/login/freelancerChangePassUseCase";
import { FreelancerForgotPassOtpUseCase } from "../../useCase/freelancer/auth/login/freelancerForgotPassOtpUseCase";
import { FreelancerForgotPassUseCase } from "../../useCase/freelancer/auth/login/freelancerForgotPassUseCase";
import { FreelancerLoginUseCase } from "../../useCase/freelancer/auth/login/freelancerLoginUseCase";
import { FreelacerRegisterUseCase } from "../../useCase/freelancer/auth/register/freelancerRegisterUseCase";
import { FreelancerResendOtpUseCase } from "../../useCase/freelancer/auth/register/freelancerResendOtpUseCase";
import { FreelancerSentOtpUseCase } from "../../useCase/freelancer/auth/register/freelancerSentOtpUseCase";
import { FreelancerVerifyOtpUseCase } from "../../useCase/freelancer/auth/register/freelancerVerifyOtpUseCase";
import { GetUserUseCase } from "../../useCase/freelancer/dashBoard/profile/GetUserDetailsUseCase";
import { UpdateProfileUseCase } from "../../useCase/freelancer/dashBoard/profile/UpdateProfileUseCase";
import { EmailService } from "../service/emailService";
import { HashPasswordService } from "../service/hashPasswordService";
import { JwtService } from "../service/jwtService";
import { OtpSerrvice } from "../service/otpService";
import { FreelancerJobListController } from "../../adapters/controllers/freelancer/jobs/freelancerJobListController";
import { FreelancerJobListUseCase } from "../../useCase/freelancer/jobs/freelancerJobListUseCase";
import { JobRepository } from "../../adapters/repository/client/jobRepository";
import { BidCreateController } from "../../adapters/controllers/freelancer/bid/createBidController";
import { CreateBidUseCase } from "../../useCase/freelancer/bid/createBidUseCase";
import { BidRepository } from "../../adapters/repository/freelancer/bidRepository";
import { WalletRepository } from "../../adapters/repository/client/walletRepository";
import { ListAcceptJobsController } from "../../adapters/controllers/freelancer/jobs/listAcceptJobController";
import { ListAcceptJobsUsecse } from "../../useCase/freelancer/jobs/listAcceptJobsUsecase";
import { ListBidController } from "../../adapters/controllers/freelancer/bid/listBidController";
import { ListBidUsecase } from "../../useCase/freelancer/bid/listBidUsecase";
import {  ListCompletedJobsController } from "../../adapters/controllers/freelancer/jobs/listCompletedJobsController";
import { ListCopletedJobsUsecase } from "../../useCase/freelancer/jobs/listCopletedJobsUsecase";
import { MilestoneSubmitController } from "../../adapters/controllers/freelancer/milestone/milestoneSubmitController";
import { SubmitMilestoneUsecase } from "../../useCase/freelancer/milestone/submitMilestoneUsecase";
import { MileStoneRepository } from "../../adapters/repository/client/milestoneRepository";


//signup
export const freelancerRepository = new FreelancerRepository()
const clientRepository = new ClientRepository()
const otpService = new OtpSerrvice()
const emailService = new EmailService()
const freelancerVerifyOtpUseCase = new FreelancerVerifyOtpUseCase(freelancerRepository, clientRepository, otpService)
const freelancerSendOtpUseCase = new FreelancerSentOtpUseCase(freelancerRepository, clientRepository, otpService, emailService)
const hashPassword = new HashPasswordService()
const walletRepository=new WalletRepository()
const freelancerRegisterUseCase = new FreelacerRegisterUseCase(freelancerRepository, clientRepository, hashPassword,walletRepository)
export const freelancerSendOtpController = new FreelancerSentOtpController(freelancerSendOtpUseCase)
export const freelancerVerifyOtpController = new FreelancerVerifyOtpController(freelancerVerifyOtpUseCase, freelancerRegisterUseCase)


//login

const jwtService = new JwtService()
const freelancerLoginUseCase = new FreelancerLoginUseCase(freelancerRepository, hashPassword, jwtService)
export const freelancerLoginController = new FreelancerLoginController(freelancerLoginUseCase)

const freelancerGoogleAuthUseCase = new FreelancerGoogleAuthUseCase(freelancerRepository, clientRepository, jwtService);
export const freelancerGoogleController = new FreelancerGoogleController(freelancerGoogleAuthUseCase);

//resendOtp

const freelancerResendOtpUseCase = new FreelancerResendOtpUseCase(freelancerRepository, clientRepository, otpService, emailService)
export const freelancerResendOtpController = new FreelancerResendOtpController(freelancerResendOtpUseCase)

//forgot password

const freelancerForgotPassUseCase = new FreelancerForgotPassUseCase(freelancerRepository, clientRepository, otpService, emailService)
export const freelancerForgotPassController = new FreelancerForgotPassController(freelancerForgotPassUseCase)

// forgot pass otp check
const freelancerForgotPassOtpUseCase = new FreelancerForgotPassOtpUseCase(freelancerRepository, clientRepository, otpService)
export const freelancerForgotPassOtpController = new FreelancerForgotPassOtpController(freelancerForgotPassOtpUseCase)


//change Password

const freelancerChangePassUseCase = new FreelancerChangePassUseCase(freelancerRepository, clientRepository, hashPassword)
export const freelancerChangePassController = new FreelancerChagePassController(freelancerChangePassUseCase)


//update Profile

const updateProfileUseCase = new UpdateProfileUseCase(freelancerRepository)
export const freelancerUpdateProfileController = new FreelancerUpdateProfileController(updateProfileUseCase)

// FreelancerData

const getUserUseCase = new GetUserUseCase(freelancerRepository)
export const freelancerDataController = new FreelancerDataController(getUserUseCase)

//freelancer list jobs

const jobRepository=new JobRepository()
const freelancerJobListUseCase=new FreelancerJobListUseCase(jobRepository)
export const freelancerJobListController=new FreelancerJobListController(freelancerJobListUseCase)


// bid create controller
const bidRepository=new BidRepository()
const createBidUseCase=new CreateBidUseCase(bidRepository)
export const bidCreateController=new BidCreateController(createBidUseCase)

//list accept jobs
const listAccetpJobsUsecase=new ListAcceptJobsUsecse(jobRepository)
export const listAcceptJobsController=new ListAcceptJobsController(listAccetpJobsUsecase)

//list bids
const listBidUsecase=new ListBidUsecase(bidRepository)
export const listBidController=new ListBidController(listBidUsecase)

//list completed jobs


const listcomletedJobs=new ListCopletedJobsUsecase(jobRepository)
export const listCompletedJobsController=new ListCompletedJobsController(listcomletedJobs)

//milestone Update

const milestoneRepository=new MileStoneRepository()
const submitMilestoneUsecase=new SubmitMilestoneUsecase(milestoneRepository)
export const milestoneSubmitController=new MilestoneSubmitController(submitMilestoneUsecase)
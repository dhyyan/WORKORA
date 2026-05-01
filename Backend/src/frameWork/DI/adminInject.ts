import { AdminLoginController } from "../../adapters/controllers/admin/auth/admilControllerLogin";
import { ClientListController } from "../../adapters/controllers/admin/client/ clientListController";
import { CategoryController } from "../../adapters/controllers/admin/client/categoryController";
// import { CategoryListController } from "../../adapters/controllers/admin/client/categoryUpdateController";
import { MilestoneListController } from "../../adapters/controllers/admin/client/milestoneListController";
import { UserBlockController } from "../../adapters/controllers/admin/client/userBlockController";
import { ConcernListController } from "../../adapters/controllers/admin/concern/concernListController";
import { PaymentReleseController } from "../../adapters/controllers/admin/freelancer/escrow/paymentReleseController";
import { FreelancerListController } from "../../adapters/controllers/admin/freelancer/freelancerListConroller";
import { CategoryRepository } from "../../adapters/repository/client/categoryRepository";
import { ClientRepository } from "../../adapters/repository/client/clientRepository";
import { ContractRepository } from "../../adapters/repository/client/contractRepository";
import { EscrowRepository } from "../../adapters/repository/client/escrowRepository";
import { MileStoneRepository } from "../../adapters/repository/client/milestoneRepository";
import { WalletRepository } from "../../adapters/repository/client/walletRepository";
import { JobRepository } from "../../adapters/repository/client/jobRepository";
import { ConcernRepository } from "../../adapters/repository/freelancer/concernRepository";
import { FreelancerRepository } from "../../adapters/repository/freelancer/freelancerRepository";
import { AmdinLoginUseCase } from "../../useCase/admin/auth/adminlLoginUseCase";
import { CategoryUsecase } from "../../useCase/admin/client/categoryUsecase";
import { ClientListUseCase } from "../../useCase/admin/client/clientListUseCase";
import { MilestoneListUsecase } from "../../useCase/admin/client/milestoneListUsecase";
import { UserBlockUseCase } from "../../useCase/admin/client/userBlockUseCase";
import { ConcernListUsecase } from "../../useCase/admin/concern/concerListUsecase";
import { PaymentReleseUseCase } from "../../useCase/admin/freelancer/escrow/paymentReleseUseCase";
import { FreelancerListUseCase } from "../../useCase/admin/freelancer/freelancerListUseCase";
import { HashPasswordService } from "../service/hashPasswordService";
import { JwtService } from "../service/jwtService";
import { GetSubscriptionRevenueUseCase } from "../../useCase/admin/subscription/GetSubscriptionRevenueUseCase";
import { GetSubscriptionRevenueController } from "../../adapters/controllers/admin/subscription/GetSubscriptionRevenueController";


//auth
const clientRepository = new ClientRepository()
const passwordHash = new HashPasswordService()
const jwtService = new JwtService()
const adminLoginUseCase = new AmdinLoginUseCase(clientRepository, passwordHash, jwtService)
export const adminLoginController = new AdminLoginController(adminLoginUseCase)


//client 

const clientListUseCase = new ClientListUseCase(clientRepository)
export const clientListController = new ClientListController(clientListUseCase)


//freelancer

const freelancerRepository = new FreelancerRepository()
const freelancerListUseCase = new FreelancerListUseCase(freelancerRepository)
export const freelancerListController = new FreelancerListController(freelancerListUseCase)

//block User
const userBlockUseCase = new UserBlockUseCase(clientRepository, freelancerRepository)
export const userBlockController = new UserBlockController(userBlockUseCase)

//relesePayment

const milestoneRepository = new MileStoneRepository()
const contractRepository = new ContractRepository
const walletRepository = new WalletRepository()
const escrowRepository = new EscrowRepository()
const paymentReleseUseCase = new PaymentReleseUseCase(milestoneRepository, contractRepository, walletRepository, escrowRepository)
export const paymentReleseController = new PaymentReleseController(paymentReleseUseCase)



//milestone list
const milestoneListUsecase = new MilestoneListUsecase(milestoneRepository)
export const milestoneListController = new MilestoneListController(milestoneListUsecase)

//catetory
const categoryRepository = new CategoryRepository
const categoryUsecase = new CategoryUsecase(categoryRepository)
export const categoryController = new CategoryController(categoryUsecase)

//category list
//  const categoryListUsecase=new CategoryListUsecase(categoryRepository)
//  export const categoryListController=new CategoryListController()

//concern list
const concernRepository = new ConcernRepository()
const jobRepositoryForConcern = new JobRepository()
const concernListUsecase = new ConcernListUsecase(concernRepository, contractRepository, jobRepositoryForConcern, walletRepository, milestoneRepository)
export const concernListController = new ConcernListController(concernListUsecase)

//subscription revenue
const getSubscriptionRevenueUseCase = new GetSubscriptionRevenueUseCase(clientRepository, walletRepository)
export const getSubscriptionRevenueController = new GetSubscriptionRevenueController(getSubscriptionRevenueUseCase)
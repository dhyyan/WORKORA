import { AdminLoginController } from "../../adapters/controllers/admin/auth/admilControllerLogin";
import { ClientListController } from "../../adapters/controllers/admin/client/ clientListController";
import { UserBlockController } from "../../adapters/controllers/admin/client/userBlockController";
import { FreelancerListController } from "../../adapters/controllers/admin/freelancer/freelancerListConroller";
import { ClientRepository } from "../../adapters/repository/client/clientRepository";
import { FreelancerRepository } from "../../adapters/repository/freelancer/freelancerRepository";
import { AmdinLoginUseCase } from "../../useCase/admin/auth/adminlLoginUseCase";
import { ClientListUseCase } from "../../useCase/admin/client/clientListUseCase";
import { UserBlockUseCase } from "../../useCase/admin/client/userBlockUseCase";
import { FreelancerListUseCase } from "../../useCase/admin/freelancer/freelancerListUseCase";
import { HashPasswordService } from "../service/hashPasswordService";
import { JwtService } from "../service/jwtService";


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

const freelancerRepository=new FreelancerRepository()
const freelancerListUseCase=new FreelancerListUseCase(freelancerRepository)
export const freelancerListController=new FreelancerListController(freelancerListUseCase)

//block User
const userBlockUseCase=new UserBlockUseCase(clientRepository,freelancerRepository)
export const userBlockController=new UserBlockController(userBlockUseCase)


import { AdminLoginController } from "../../adapters/controllers/admin/auth/admilControllerLogin";
import { ClientListController } from "../../adapters/controllers/admin/client/ clientListController";
import { ClientRepository } from "../../adapters/repository/client/clientRepository";
import { AmdinLoginUseCase } from "../../useCase/admin/auth/adminlLoginUseCase";
import { ClientListUseCase } from "../../useCase/admin/auth/client/clientListUseCase";
import { HashPasswordService } from "../service/hashPasswordService";
import { JwtService } from "../service/jwtService";


//auth
const clientRepository=new ClientRepository()
const passwordHash=new HashPasswordService()
const jwtService=new JwtService()
const adminLoginUseCase=new AmdinLoginUseCase(clientRepository,passwordHash,jwtService)
export const adminLoginController=new AdminLoginController(adminLoginUseCase)


//client 

const clientListUseCase=new ClientListUseCase(clientRepository)
export const clientListController=new ClientListController(clientListUseCase)


import { Request, Response } from "express";
import { HttpStatus } from "../../../../domain/entities/httpStatus";
import { IClientListUseCase } from "../../../../domain/interface/useCaseInterface/admin/client/clientListUseCase";

export class ClientListController {

  private _clientListUseCase: IClientListUseCase
  constructor(clientListUseCase: IClientListUseCase) {
    this._clientListUseCase = clientListUseCase
  }
  async listUser(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const search = (req.query.search as string) || "";

      console.log("page",page)
      console.log("limit",limit)
      console.log("search",search)

      const response = await this._clientListUseCase.listclients({ page, limit, search });

      
      console.log("users datas from controller", response);
      if (response) {
        res.status(HttpStatus.OK).json({ message: "user datas fetched success", response });
        return;
      }
      res.status(HttpStatus.NOT_FOUND).json({ message: "user datas fetched failed" });
    } catch (error) {
      console.error(error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
    }
  }
}
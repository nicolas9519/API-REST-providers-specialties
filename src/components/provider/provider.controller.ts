import { Application, NextFunction, Request, Response, Router } from "express";
import { QueryFindOptions } from "mongoose";
import responseJson from "../../utils/helperFunctions/responseJson";
import validateJoi from "../../utils/helperFunctions/validateJoi";
import { IObject } from "../../utils/interfaces/IObject";
import { getAll } from "./provider.schemas";
import { ProviderService } from "./provider.service";

export class ProviderController {

  private providerService: ProviderService;

  constructor(app: Application) {
    const router = Router();

    this.providerService = new ProviderService();

    router.get('', this.getAll.bind(this));

    app.use('/provider', router);
  }

  public async getAll(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const query = validateJoi(getAll, req.query);
      const paging: QueryFindOptions = {
        skip: query.offSet || 0,
        limit: query.limit || 1,
      };
      delete query.offSet;
      delete query.limit;

      const filters: IObject = {};
      for (const key in query) {
        filters[key] = query[key];
      }
      const providers = await this.providerService.getAll(filters, paging);
      return responseJson(res, 200, providers);
    } catch (error) {
      next(error);
    }
  }

}
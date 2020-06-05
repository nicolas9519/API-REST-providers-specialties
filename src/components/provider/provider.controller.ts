import { Application, NextFunction, Request, Response, Router } from "express";
import { QueryFindOptions } from "mongoose";
import responseJson from "../../utils/helperFunctions/responseJson";
import validateJoi from "../../utils/helperFunctions/validateJoi";
import { IObject } from "../../utils/interfaces/IObject";
import { getAll, create } from "./provider.schemas";
import { ProviderService } from "./provider.service";
import validateMongoId from "../../utils/helperFunctions/validateMongoId";

export class ProviderController {

  private providerService: ProviderService;

  constructor(app: Application) {
    const router = Router();

    this.providerService = new ProviderService();

    router.get('', this.getAll.bind(this));
    router.post('', this.create.bind(this));
    router.get('/:id', this.getById.bind(this));

    app.use('/provider', router);
  }

  public async getAll(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const query = validateJoi(getAll, req.query);
      const paging: QueryFindOptions = {
        skip: query.offSet || 0,
        limit: query.limit || 10,
      };
      delete query.offSet;
      delete query.limit;

      const filters: IObject = {};
      for (const key in query) {
        filters[key] = query[key];
      }
      const { providers, quantity } = await this.providerService.getAll(filters, paging);
      return responseJson(res, 200, providers, quantity);
    } catch (error) {
      next(error);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const body = validateJoi(create, req.body);
      const provider = await this.providerService.create(body);
      return responseJson(res, 201, provider);
    } catch (error) {
      next(error);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const id = validateMongoId(req.params.id);
      const provider = await this.providerService.getById(id);
      return responseJson(res, 200, provider);
    } catch (error) {
      next(error);
    }
  }

}
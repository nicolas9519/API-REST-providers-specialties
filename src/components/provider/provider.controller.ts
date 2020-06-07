import { Application, NextFunction, Request, Response, Router } from "express";
import { QueryFindOptions } from "mongoose";
import createFilters from "../../utils/helperFunctions/createFilters";
import responseJson from "../../utils/helperFunctions/responseJson";
import validateJoi from "../../utils/helperFunctions/validateJoi";
import validateMongoId from "../../utils/helperFunctions/validateMongoId";
import { IObject } from "../../utils/interfaces/IObject";
import { create, getAll, getAllMap, update } from "./provider.schemas";
import { ProviderService } from "./provider.service";

export class ProviderController {

  private providerService: ProviderService;

  constructor(app: Application) {
    const router = Router();

    this.providerService = new ProviderService();

    router.get('', this.getAll.bind(this));
    router.post('', this.create.bind(this));
    router.get('/:id', this.getById.bind(this));
    router.put('/:id', this.update.bind(this));
    router.delete('/:id', this.delete.bind(this));

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

      const filters: IObject = createFilters(query, getAllMap);
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

  public async update(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const id = validateMongoId(req.params.id);
      const body = validateJoi(update, req.body);
      const provider = await this.providerService.update(id, body);
      return responseJson(res, 200, provider);
    } catch (error) {
      next(error);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const id = validateMongoId(req.params.id);
      const provider = await this.providerService.delete(id);
      return responseJson(res, 200, provider);
    } catch (error) {
      next(error);
    }
  }

}
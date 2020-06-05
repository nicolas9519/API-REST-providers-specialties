import { Application, NextFunction, Request, Response, Router } from 'express';
import { QueryFindOptions } from 'mongoose';
import responseJson from '../../utils/helperFunctions/responseJson';
import validateJoi from '../../utils/helperFunctions/validateJoi';
import validateMongoId from '../../utils/helperFunctions/validateMongoId';
import { IObject } from '../../utils/interfaces/IObject';
import { create, getAll, update } from './specialty.schemas';
import { SpecialtyService } from './specialty.service';


export class SpecialtyController {

  private specialtyService: SpecialtyService;

  constructor(app: Application) {
    this.specialtyService = new SpecialtyService();
    const router = Router();

    router.get('', this.getAll.bind(this));
    router.post('', this.create.bind(this));
    router.get('/:id', this.getById.bind(this));
    router.put('/:id', this.update.bind(this));
    router.delete('/:id', this.deleteById.bind(this));

    app.use('/specialty', router);
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
      if (query.name) filters.name = { $regex: `${query.name}` };
      delete query.name;
      for (const key in query) {
        filters[key] = query[key];
      }

      const { specialties, quantity } = await this.specialtyService.getAll(filters, paging);
      return responseJson(res, 200, specialties, quantity);
    } catch (error) {
      return next(error);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const id = validateMongoId(req.params.id);
      const specialty = await this.specialtyService.getById(id);
      return responseJson(res, 200, specialty);
    } catch (error) {
      return next(error);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const body = validateJoi(create, req.body);
      const specialty = await this.specialtyService.create(body);
      return responseJson(res, 201, specialty);
    } catch (error) {
      return next(error);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const id = validateMongoId(req.params.id);
      const body = validateJoi(update, req.body);
      const specialty = await this.specialtyService.update(id, body);
      return responseJson(res, 200, specialty);
    } catch (error) {
      return next(error);
    }
  }

  public async deleteById(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const id = validateMongoId(req.params.id);
      const specialty = await this.specialtyService.delete(id);
      return responseJson(res, 200, specialty);
    } catch (error) {
      return next(error);
    }
  }

}

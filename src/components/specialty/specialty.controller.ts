import { Application, Router, NextFunction, Request, Response } from 'express';

import { create, getAll, update } from './specialty.schemas';
import { SpecialtyService } from './specialty.service';
import responseJson from '../../utils/helperFunctions/responseJson';
import validateJoi from '../../utils/helperFunctions/validateJoi';
import validateMongoId from '../../utils/helperFunctions/validateMongoId';

export class SpecialtyController {

  private specialtyService: SpecialtyService;

  constructor(app: Application) {
    this.specialtyService = new SpecialtyService();
    const router = Router();

    router.get('', this.getAll.bind(this));
    router.post('', this.create.bind(this));
    router.get('/:id', this.getById.bind(this));
    router.patch('/:id', this.update.bind(this));
    router.delete('/:id', this.deleteById.bind(this));

    app.use('/specialty', router);
  }

  public async getAll(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const filters = validateJoi(getAll, req.query);
      const specialties = await this.specialtyService.getAll(filters);
      return responseJson(res, 200, specialties);
    } catch (error) {
      return next(error);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      validateMongoId(req.params.id);
      const specialty = await this.specialtyService.getById(req.params.id);
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
      validateMongoId(req.params.id);
      const body = validateJoi(update, req.body);
      const specialty = await this.specialtyService.update(req.params.id, body);
      return responseJson(res, 200, specialty);
    } catch (error) {
      return next(error);
    }
  }

  public async deleteById(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      validateMongoId(req.params.id);
      const specialty = await this.specialtyService.delete(req.params.id);
      return responseJson(res, 200, specialty);
    } catch (error) {
      return next(error);
    }
  }

}

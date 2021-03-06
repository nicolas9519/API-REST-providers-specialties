import { Application, NextFunction, Request, Response, Router } from 'express';
import organizeQuery from '../../utils/helperFunctions/createFilters';
import responseJson from '../../utils/helperFunctions/responseJson';
import validateJoi from '../../utils/helperFunctions/validateJoi';
import validateMongoId from '../../utils/helperFunctions/validateMongoId';
import { create, getAll, getAllMap, update } from './specialty.schemas';
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
      const { filters, paging, sort } = organizeQuery(query, getAllMap);
      const { specialties, quantity } = await this.specialtyService.getAll(filters, paging, sort);
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

import { Application, Router, NextFunction, Request, Response } from 'express';
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
    router.patch('/:id', this.update.bind(this));
    router.delete('/:id', this.deleteById.bind(this));

    app.use('/specialty', router);
  }

  public async getAll(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      let filters = req.query;
      if (req.query) {
        filters = await getAll.validateAsync(req.query);
      }
      const specialties = await this.specialtyService.getAll(filters);
      return res.status(200).json(specialties);
    } catch (error) {
      return next(error);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const specialties = await this.specialtyService.getById(req.params.id);
      return res.status(200).json(specialties);
    } catch (error) {
      return next(error);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const body = await create.validateAsync(req.body);
      const specialties = await this.specialtyService.create(body);
      return res.status(200).json(specialties);
    } catch (error) {
      return next(error);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const body = await update.validateAsync(req.body);
      const specialties = await this.specialtyService.update(req.params.id, body);
      return res.status(200).json(specialties);
    } catch (error) {
      return next(error);
    }
  }

  public async deleteById(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const specialties = await this.specialtyService.delete(req.params.id);
      return res.status(200).json(specialties);
    } catch (error) {
      return next(error);
    }
  }

}

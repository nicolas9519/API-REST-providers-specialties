import { Application, Router, NextFunction, Request, Response } from 'express';
import { getAll } from './specialty.schemas';
import { SpecialtyService } from './specialty.service';

export class SpecialtyController {

  private specialtyService: SpecialtyService;

  constructor(app: Application) {
    this.specialtyService = new SpecialtyService();
    const router = Router();

    router.get('', this.getAll.bind(this));
    
    app.use('/specialty', router);
  }

  public async getAll(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      let filters = req.query;
      if(req.query) {
        filters = await getAll.validateAsync(req.query);
      }
      const specialties = await this.specialtyService.getAll(filters);
      return res.status(200).json(specialties);
    } catch (error) {
      return next(error);
    }
  }
}

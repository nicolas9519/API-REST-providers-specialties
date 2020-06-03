import { Application, Request, Response, NextFunction } from 'express';

import { SpecialtyController } from '../components';
import { general } from '../config/config';
import { StatusCodes, NotFound, ErrorStatus, ErrorList } from '../utils/ErrorStatus';

export class Routes {
  public init(app: Application) {

    new SpecialtyController(app);

    app.use('*', this.notFound);

    app.use(this.errorHandler);
  }

  private async notFound(req: Request, res: Response, next: NextFunction): Promise<void> {
    const error = new NotFound('Resource not found');
    next(error);
  }

  private async errorHandler(error: any, req: Request, res: Response, next: NextFunction): Promise<void> {
    const statusCode: number = error.statusCode || StatusCodes.BAD_IMPLEMENTATION;
    const message: string = error.message || ErrorList.BAD_IMPLEMENTATION;
    if (general.env !== 'develop') {
      delete error.stack;
    }
    const newError = new ErrorStatus(statusCode, error.name, message, error.payload, error.stack);
    res.status(statusCode).json(newError);
  }
}

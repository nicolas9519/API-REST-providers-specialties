import { Application, Request, Response, NextFunction } from 'express';

import { SpecialtyController } from '../components';
import { general } from '../config/config';
import { ErrorStatus } from '../utils/ErrorStatus';

export class Routes {
  public init(app: Application) {

    new SpecialtyController(app);

    app.use('*', this.notFound);

    app.use(this.errorHandler);
  }

  private async notFound(req: Request, res: Response, next: NextFunction): Promise<void> {
    const error = ErrorStatus.notImplemented('Method not found');
    next(error);
  }

  private async errorHandler(error: any, req: Request, res: Response, next: NextFunction): Promise<void> {
    let newError = error;
    if (!newError.handledError) {
      newError = ErrorStatus.badImplementation(error.message, error.payload, error.stack)
    }
    if (general.env !== 'develop') {
      delete newError.stack;
    }
    delete newError.handledError;
    res.status(newError.statusCode).json(newError);
  }
}

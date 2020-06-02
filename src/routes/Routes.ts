import { Application, Request, Response, NextFunction } from 'express';

import { SpecialtyController } from '../components';

export class Routes {
  public init(app: Application) {

    new SpecialtyController(app);

    app.use('*', this.notFound);

    app.use(this.errorHandler);
  }

  private async notFound(req: Request, res: Response): Promise<void> {
    res.status(404).json({ message: 'Sorry, resource not found '});
  }

  private async errorHandler(error: any, req: Request, res: Response, next: NextFunction): Promise<void> {
    const bodyError = {
      message: error.message || error.name,
    }
    res.status(500).json(bodyError);
  }
}

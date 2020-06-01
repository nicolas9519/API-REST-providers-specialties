import { Application, Request, Response } from 'express';

import { general } from '../config/config';
import { SpecialtyController } from '../components';

export class Routes {
  public init(app: Application) {

    new SpecialtyController(app);

    app.use('*', this.notFound);

    app.use(this.errorHandler);
  }

  private async notFound(req: Request, res: Response): Promise<void> {
    res.status(404).send('<h1>Not found</h1>');
  }

  private async errorHandler(error: Error, req: Request, res: Response): Promise<void> {
    console.log(error);
    res.status(500).send('Oops, something went wrong.');
  }
}

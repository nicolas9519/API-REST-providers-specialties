import { Application, NextFunction, Request, Response, Router } from "express";
import { existsSync } from 'fs';
import { join } from 'path';
import { fileHandler } from "../../config/config";
import { ErrorStatus } from "../../utils/ErrorStatus";

export class FilesController {

  constructor(app: Application) {
    const router = Router();

    router.get('/:folder/:name', this.get.bind(this));

    app.use('/files', router);
  }

  public async get(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const file = join(fileHandler.file_path, req.params.folder, req.params.name);
      if (!existsSync(file)) {
        throw ErrorStatus.notFound('The resource does not exist');
      }
      return res.download(file);
    } catch (error) {
      return next(error);
    }
  }

}

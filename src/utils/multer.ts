import { Request } from 'express';
import { existsSync, mkdirSync } from 'fs';
import * as multer from 'multer';
import { extname, join } from 'path';
import { fileHandler } from '../config/config';
import { ErrorStatus } from './ErrorStatus';

export class UploadFile {

  constructor() { }

  public static createStorage(folder: string): any {
    const finalPath = join(fileHandler.file_path, folder);
    if (!existsSync(finalPath)) {
      mkdirSync(finalPath);
    }
    const storage = multer.diskStorage({
      destination: function (req: Request, file: Express.Multer.File, cb: Function) {
        cb(null, finalPath);
      },
      filename: function (req: Request, file: Express.Multer.File, cb: Function) {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        const ext = extname(file.originalname);
        const name = `${file.fieldname}-${uniqueSuffix}.${ext}`;
        cb(null, name);
      }
    });
    const upload = multer({ storage, fileFilter: UploadFile.imageFilter });
    return upload;
  }

  private static imageFilter(req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback): void {
    const supportedImages = ['jpg', 'jpeg', 'png'];
    const ext = extname(file.originalname).substr(1);
    if (supportedImages.indexOf(ext) < 0) {
      return cb(ErrorStatus.badRequest(`The supported files are ${supportedImages.join(', ')}`));
    }
    cb(null, true);
  }

}

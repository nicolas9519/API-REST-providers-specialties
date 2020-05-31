import { Application } from "express";


export class Routes {
  public init(app: Application) {
    app.use('/', (req, res, next) => {
      res.status(200).json({
        message: 'Test'
      });
    });
  }
}

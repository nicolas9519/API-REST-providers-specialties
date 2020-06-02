import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';

import { Routes } from './routes/Routes';

class App {

  public app: express.Application;
  private routes: Routes;

  constructor() {
    this.app = express();
    this.config();
    this.routes = new Routes();
    this.routes.init(this.app);
  }

  private config() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({
      extended: true
    }));
    this.app.use(helmet());
  }

}

export default new App().app;

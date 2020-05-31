import * as https from 'https';
import * as fs from 'fs';
import * as path from 'path';

import app from './app';
import { config } from './config/config';

if (config.env === 'develop') {
  app.listen(config.port, function () {
    console.log('Express server listening on port ' + config.port);
  });
} else {
  const httpsOptions = {
    key: fs.readFileSync(path.join(config.path_https_cert, 'key.pem')),
    cert: fs.readFileSync(path.join(config.path_https_cert, 'cert.pem'))
  }

  https.createServer(httpsOptions, app).listen(config.port, function () {
    console.log('Express server listening on port ' + config.port);
  });
}

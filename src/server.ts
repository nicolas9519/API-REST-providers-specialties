import * as https from 'https';
import * as fs from 'fs';
import * as path from 'path';

import app from './app';
import { general } from './config/config';

const PORT = general.port || 3000;

if (general.env === 'develop') {
  app.listen(PORT, function listenApp() {
    console.log('Express server listening on port ' + PORT);
  });
} else {
  const httpsOptions = {
    key: fs.readFileSync(path.join(general.path_https_cert, 'key.pem')),
    cert: fs.readFileSync(path.join(general.path_https_cert, 'cert.pem'))
  }

  https.createServer(httpsOptions, app).listen(PORT, function listenServer() {
    console.log('Express server listening on port ' + PORT);
  });
}

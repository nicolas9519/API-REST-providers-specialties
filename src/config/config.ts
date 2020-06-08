import { existsSync, mkdirSync } from 'fs';

const general = {
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  path_https_cert: process.env.PATH_HTTP_CERT,
};

const database = {
  mongo_db_url: process.env.MONGO_DB_URL
};

const fileHandler = {
  file_path: process.env.FILES_PATH
};

if (!existsSync(fileHandler.file_path)) {
  mkdirSync(fileHandler.file_path);
}

export {
  general,
  database,
  fileHandler
};

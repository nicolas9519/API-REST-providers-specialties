const general = {
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  path_https_cert: process.env.PATH_HTTP_CERT,
};

const database = {
  mongo_db_url: process.env.MONGO_DB_URL
}

export {
  general,
  database
};

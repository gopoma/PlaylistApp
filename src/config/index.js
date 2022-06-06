require("dotenv").config();

const config = {
  port: process.env.PORT,
  sessionSecret: process.env.SESSION_SECRET,
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME
};

module.exports = config;
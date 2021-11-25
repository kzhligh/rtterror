const dotenv = require('dotenv');

const envFile = dotenv.config();
if (envFile.error) {
  throw new Error('ERROR - .env file is not found');
}

const config = {
  port: parseInt(process.env.PORT) || 5000,
  databases: {
    mysql: {
      host: process.env.MYSQL_HOST || 'localhost',
      port: process.env.MYSQL_PORT || '3306',
      database: process.env.MYSQL_DATABASE || 'database1',
      username: process.env.MYSQL_USERNAME || 'root',
      password: process.env.MYSQL_PASSWORD || 'password',
    },
  },
};

module.exports = config;

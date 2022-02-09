import dotenv from 'dotenv';

const envFile = dotenv.config();
if (envFile.error) {
  throw new Error('ERROR - .env file not found');
}

export default {
  port: +process.env.PORT! || 5000,
  database: {
    mysql: {
      host: process.env.MYSQL_HOST || 'localhost',
      port: process.env.MYSQL_PORT || '3306',
      database: process.env.MYSQL_DATABASE || 'database1',
      username: process.env.MYSQL_USERNAME || 'root',
      password: process.env.MYSQL_PASSWORD || 'password',
    },
  },
};

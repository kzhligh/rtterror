import dotenv from 'dotenv';

const envFile = dotenv.config();
if (envFile.error) {
  throw new Error('ERROR - .env file not found');
}

const env = process.env.NODE_ENV || 'dev';

const defineConfig = (
  appPort: string = '5000',
  dbHost: string = 'localhost',
  dbPort: string = '3306',
  dbName: string = 'database1',
  dbUsername: string = 'root',
  dbPassword: string = ''
) => ({
  port: parseInt(appPort),
  database: {
    mysql: {
      host: dbHost,
      port: dbPort,
      database: dbName,
      username: dbUsername,
      password: dbPassword,
    },
  },
});

const definedConfigs: { [key: string]: any } = {
  test: defineConfig(
    process.env.PORT_TEST,
    process.env.MYSQL_HOST_TEST,
    process.env.MYSQL_PORT_TEST,
    process.env.MYSQL_DATABASE_TEST || 'database2',
    process.env.MYSQL_USERNAME_TEST,
    process.env.MYSQL_PASSWORD_TEST
  ),
  dev: defineConfig(
    process.env.PORT,
    process.env.MYSQL_HOST,
    process.env.MYSQL_PORT,
    process.env.MYSQL_DATABASE || 'database1',
    process.env.MYSQL_USERNAME,
    process.env.MYSQL_PASSWORD
  ),
};

const config = definedConfigs[env];

export default config;

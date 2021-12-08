import { Sequelize } from 'sequelize';
import config from '../config';

const sequelize: Sequelize = new Sequelize({
  host: config.database.mysql.host,
  port: parseInt(config.database.mysql.port),
  database: config.database.mysql.database,
  username: config.database.mysql.username,
  password: config.database.mysql.password,
  dialect: 'mysql',
  logging: false,
  define: {
    freezeTableName: true,
  },
});

export default sequelize;

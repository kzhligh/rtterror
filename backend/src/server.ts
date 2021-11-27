import express from 'express';
import cors from 'cors';
import sequelize from './modules/sequelize';
import config from './config';
import syncTables from "./models/syncTables";   // this import should always before importing router
import router from './routes';

const startServer = async () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  sequelize
    .authenticate()
    .then(() => {
      console.log(
        'Sequelize successfully connected to MySQL database on port:  ' +
          config.database.mysql.port
      );
    })
    .catch((error) => {
      console.error('ERROR - connection failed: ', error);
    });

  await syncTables();     // syncTables() should always before app.use('/api/v1', router)
  app.use('/api/v1', router);

  const PORT = config.port || 5000;

  app.listen(PORT, () => {
    console.log('server starts on port: ', PORT);
  });
};

startServer();

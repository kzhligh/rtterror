import express from 'express';
import cors from 'cors';
import sequelize from './modules/sequelize';
import config from './config';
import syncTables from './models/syncTables'; // this import should always before importing router
import router from './routes';

const app = express();

const startServer = async () => {
  try {
    app.use(express.json());
    app.use(cors());

    // Sync Sequelize Models
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

    await syncTables(); // syncTables() should always before app.use('/api/v1', router)

    // Set api path
    app.use('/api/v1', router);

    // Set port
    app.listen(config.port, () => {
      console.log('server starts on port: ', config.port);
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();

export default app;
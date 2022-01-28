import express from 'express';
import cors from 'cors';
import sequelize from './modules/sequelize';
import config from './config';
import syncTables from './models/syncTables'; // this import should always before importing router
import router from './routes';

const app1 = express();
app1.disable("x-powered-by");


const startServer = async () => {
  try {
    let corsOptions = {
    };

    app1.use(express.json());
    app1.use(cors(corsOptions));

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
    app1.use('/api/v1', router);

    await syncTables(); // syncTables() should always before app.use('/api/v1', router)

    // Set api path
    app1.use('/api/v1', router);

    // Set port
    app1.listen(config.port, () => {
      console.log('server starts on port: ', config.port);
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();

export default app1;

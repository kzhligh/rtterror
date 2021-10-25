const express = require('express');
const cors = require('cors');
const config = require('./config');
const sequelize = require('./modules/sequelizeClient');
const router = require('./router');
const Customer = require('./models/customer');

const app = express();

sequelize
  .authenticate()
  .then(() => {
    console.log('DB connected');
  })
  .catch((error) => console.log(error));

app.use(cors());
app.use(express.json());

app.use('/api/v1', router);

const PORT = config.port || 5000;

app.listen(PORT, () => {
  Customer.sync().then(() => {
    console.log('table created');
  });
});

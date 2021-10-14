const express = require('express');
const cors = require('cors');
const config = require('./config')
const sequelize = require('./modules/sequelizeClient');
// const customerRouters = require('./routes/customer');
const router = require('./router')

const app = express();

sequelize.authenticate()
    .then(() => { console.log('DB connected'); })
    .catch(error => console.log(error));

app.use(cors());
app.use(express.json());

app.use('/api/v1', router);

// app.use('/customers', customerRouters);

const PORT = config.port || 5000;

app.listen(PORT, () => {
    console.log('server starts on port ', PORT);
});
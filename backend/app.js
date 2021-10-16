const express = require('express');
const cors = require('cors');
const config = require('./config')
const sequelize = require('./modules/sequelize');
const router = require('./router')

const app = express();

sequelize.authenticate()
    .then(() => { console.log('DB connected'); })
    .catch(error => console.log(error));

app.use(cors());
app.use(express.json());

app.use('/api/v1', router);

const PORT = config.port || 5000;

app.listen(PORT, () => {
    console.log('server starts on port ', PORT);
});
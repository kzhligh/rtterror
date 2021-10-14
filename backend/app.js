const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const sequelize = require('./modules/sequelizeClient');
const Customer = require('./models/customer');

const app = express();

dotenv.config();

sequelize.authenticate()
    .then(() => { console.log('DB connected'); })
    .catch(error => console.log(error));

// Customer.create({id: '007', firstName: '007 first', lastName: '007 last'}, { raw: true })
//     .then(data => console.log('the return data of create is: ', data.dataValues))
//     .catch(err => console.log(err));

Customer.findAll({raw: true})
    .then(data => {
        console.log('all data from the database: ', data);
    })
    .catch(err => {
        console.log('error message is: ', err);
    });

app.use(cors());
app.use(express.json());

app.listen(process.env.PORT, () => {
    console.log('backend is running on PORT ', process.env.PORT);
});
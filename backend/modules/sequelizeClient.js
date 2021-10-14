const Sequelize = require('sequelize/lib/sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize('database1', 'root', null, {
    dialect: 'mysql',
    host: 'localhost',
    port: '3306',
    logging: false,
    define: {
        freezeTableName: true
    }
});

module.exports = sequelize;
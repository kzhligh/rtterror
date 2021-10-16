const Sequelize = require('sequelize/lib/sequelize');
const config = require('../config')

const sequelize = new Sequelize(
    config.databases.mysql.database,
    config.databases.mysql.username,
    config.databases.mysql.password,
    {
        dialect: 'mysql',
        host: config.databases.mysql.host,
        port: config.databases.mysql.port,
        logging: false,
        define: {
            freezeTableName: true
        }
});

module.exports = sequelize;
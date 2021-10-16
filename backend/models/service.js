const { DataTypes } = require('sequelize');
const sequelize = require('../modules/sequelizeClient.js');

const Service = sequelize.define('services', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
    },
    treatment_type: {
        type: DataTypes.STRING,
    },
    duration: {
        type: DataTypes.INTEGER,
    },
    price: {
        type: DataTypes.STRING,
    },
    barcode: {
        type: DataTypes.STRING,
    },
    sms_description: {
        type: DataTypes.STRING,
    }
}, {
    timestamps: false,
    freezeTableName: true
});

Service.sync().then(() => {
    console.log('table created');
});

module.exports = Service;
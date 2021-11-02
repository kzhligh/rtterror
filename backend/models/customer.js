const { DataTypes } = require('sequelize');
const sequelize = require('../modules/sequelize');

// const customer = () => {
//     const Customer = sequelize.define('customers', {
//         id: {
//             type: DataTypes.STRING,
//             primaryKey: true
//         },
//         firstName: {
//             type: DataTypes.STRING,
//         },
//         lastName: {
//             type: DataTypes.STRING,
//         }
//     }, {
//         timestamps: false,
//         freezeTableName: true,
//     });
//
//     Customer.sync().then(() => {
//         console.log('table \"customers\" created');
//     });
//
//     return Customer;
// }

const Customer = sequelize.define(
  'customers',
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

Customer.sync().then(() => {
  console.log('table "customers" created');
});

module.exports = Customer;

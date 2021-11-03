const Service = require('./service');
const Customer = require('./customer');
const Product = require('./product');

const syncAllTables = () => {
  Service.sync({ alter: true }).then(() => {
    console.log('table "services" synchronized');
  });

  Customer.sync().then(() => {
    console.log('table "customers" synchronized');
  });

  Product.sync().then(() => {
    console.log('table "products" created');
  });
};

module.exports = syncAllTables;

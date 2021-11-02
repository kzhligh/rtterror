const Service = require('./service');
const Customer = require('./customer');
const Product = require('./product');

const syncAllTables = () => {
  Service.sync().then(() => {
    console.log('table "services" created');
  });

  Customer.sync().then(() => {
    console.log('table "customers" created');
  });

  Product.sync().then(() => {
    console.log('table "products" created');
  });
};

module.exports = syncAllTables;

const { Combo } = require('./combo');
const { Service } = require('./service');
const { Customer } = require('./customer');
const { Product } = require('./product');
const { Service_Combo } = require('./serviceCombo');

const syncAllTables = async () => {
  Service.sync({ alter: true }).then(() => {
    console.log('table "services" synchronized');
  });

  Customer.sync().then(() => {
    console.log('table "customers" synchronized');
  });

  Product.sync({ alter: true }).then(() => {
    console.log('table "products" synchronized');
  });

  Combo.sync({ alter: true }).then(() => {
    console.log('table "combos" synchronized');
  });

  Service_Combo.sync({ alter: true }).then(() => {
    console.log('table "service_combo" synchronized');
  });
};

module.exports = syncAllTables;

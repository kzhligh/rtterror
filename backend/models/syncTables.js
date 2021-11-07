const { Combo } = require('./combo');
const { Service } = require('./service');
const { Customer } = require('./customer');
const { Product } = require('./product');
const { Service_Combo } = require('./serviceCombo');
const { Employee } = require('./employees');
const { ServiceEmployee } = require('./services_employees');

const syncAllTables = () => {
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

  Employee.sync({ alter: true }).then(() => {
    console.log('table "employees" synchronized');
  });

  ServiceEmployee.sync({ alter: true }).then(() => {
    console.log('table "service_employees" synchronized');
  });
};

module.exports = syncAllTables;

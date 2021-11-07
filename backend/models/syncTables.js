const { Service } = require('./service');
const { Customer } = require('./customer');
const { Product } = require('./product');
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

  Employee.sync().then(() => {
    console.log('table "employees" synchronized');
  });

  ServiceEmployee.sync().then(() => {
    console.log('table "service_employees" synchronized');
  });
};

module.exports = syncAllTables;

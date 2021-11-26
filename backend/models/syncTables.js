const { Service } = require('./service');
const { Customer } = require('./customer');
const { Product } = require('./product');
const { Appointment } = require('./appointment');

const syncAllTables = () => {
  Service.sync({ alter: true }).then(() => {
    console.log('table "services" synchronized');
  });

  Customer.sync({ alter: true }).then(() => {
    console.log('table "customers" synchronized');
  });

  Product.sync({ alter: true }).then(() => {
    console.log('table "products" synchronized');
  });

  Appointment.sync({ alter: true }).then(() => {
    console.log('table "appointments" synchronized');
  });
};

module.exports = syncAllTables;

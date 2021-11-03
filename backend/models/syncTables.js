const Service = require('./service');
const Customer = require('./customer');

const syncAllTables = () => {
  Service.sync().then(() => {
    console.log('table "services" synchronized');
  });

  Customer.sync().then(() => {
    console.log('table "customers" synchronized');
  });
};

module.exports = syncAllTables;

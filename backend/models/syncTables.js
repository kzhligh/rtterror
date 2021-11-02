const Service = require('./service');
const Customer = require('./customer');

const syncAllTables = () => {
    Service.sync().then(() => {
        console.log('table "services" created');
    });

    Customer.sync().then(() => {
        console.log('table \"customers\" created');
    });
}

module.exports = syncAllTables;
const CustomerDAO = require('../daos/customer');

async function createCustomer(customer) {
  return CustomerDAO.createCustomer(customer);
}

async function getAllCustomers(sortBy) {
  return sortBy
    ? CustomerDAO.getAllCustomers(sortBy)
    : CustomerDAO.getAllCustomers();
}

async function getCustomerByID(customerId) {
  return CustomerDAO.getCustomerByID(customerId);
}

async function deleteCustomers(customers) {
  return CustomerDAO.deleteCustomers(customers);
}

function updateCustomer(customer) {
  return CustomerDAO.updateCustomer(customer);
}

function searchCustomer(query) {
  return CustomerDAO.searchCustomer(query);
}

function checkDuplicateCustomer(firstName, lastName) {
  return CustomerDAO.checkDuplicateCustomer(firstName, lastName);
}

module.exports = {
  createCustomer,
  getAllCustomers,
  getCustomerByID,
  deleteCustomers,
  updateCustomer,
  searchCustomer,
  checkDuplicateCustomer,
};

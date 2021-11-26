const CustomerDAO = require('../daos/customer');

function createCustomer(customer) {
  return CustomerDAO.createCustomer(customer);
}

function getAllCustomers(sortBy) {
  return sortBy
    ? CustomerDAO.getAllCustomers(sortBy)
    : CustomerDAO.getAllCustomers();
}

function getCustomerByID(customerId) {
  return CustomerDAO.getCustomerByID(customerId);
}

function deleteCustomers(customers) {
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

function getCustomerWithAppointments(customerId) {
  return CustomerDAO.getCustomerWithAppointments(customerId);
}

module.exports = {
  createCustomer,
  getAllCustomers,
  getCustomerByID,
  getCustomerWithAppointments,
  deleteCustomers,
  updateCustomer,
  searchCustomer,
  checkDuplicateCustomer,
};

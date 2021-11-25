const { Customer } = require('../models/customer');
const { Op } = require('sequelize');
const { sequelize } = require('../modules/sequelize');

function createCustomer(customer) {
  return Customer.create(customer);
}

function getAllCustomers(sortBy) {
  return Customer.findAll(
    sortBy
      ? {
          order: [[sortBy, 'ASC']],
        }
      : {}
  );
}

function getCustomerByID(customerId) {
  return Customer.findByPk(customerId);
}

async function deleteCustomers(customers) {
  const t = await sequelize.transaction();
  try {
    await Customer.destroy(
      {
        where: {
          [Op.or]: customers.map((id) => ({ id })),
        },
      },
      { transaction: t }
    );
    const remainingCustomers = await Customer.findAll({ transaction: t });
    await t.commit();

    return remainingCustomers;
  } catch (error) {
    await t.rollback();
    throw error;
  }
}

function updateCustomer(customer) {
  return Customer.upsert(customer);
}

function searchCustomer(query) {
  return Customer.findAll({
    where: {
      [Op.or]: {
        firstName: {
          [Op.startsWith]: query,
        },
        lastName: {
          [Op.startsWith]: query,
        },
        email: {
          [Op.startsWith]: query,
        },
      },
    },
  });
}

async function checkDuplicateCustomer(firstName, lastName) {
  const count = await Customer.count({
    where: {
      [Op.and]: {
        firstName,
        lastName,
      },
    },
  });

  return {
    duplicate: count > 0,
  };
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

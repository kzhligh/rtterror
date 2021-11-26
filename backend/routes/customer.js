const CustomerService = require('../services/customer');
const express = require('express');

const router = express.Router();

router
  .get('/', async (req, res) => {
    const { sortBy } = req.query;
    try {
      const customers = await CustomerService.getAllCustomers(sortBy);
      res.status(200).send(customers);
    } catch (error) {
      res.status(400).send(error);
    }
  })
  .get('/duplicate', async (req, res) => {
    const { firstName, lastName } = req.query;

    try {
      const response = await CustomerService.checkDuplicateCustomer(
        firstName,
        lastName
      );

      res.status(200).send(response);
    } catch (error) {
      res.status(400).send(error);
    }
  })
  .get('/search', async (req, res) => {
    const { query } = req.query;

    try {
      const customers = await CustomerService.searchCustomer(query);
      res.status(200).send(customers);
    } catch (error) {
      res.status(400).send(error);
    }
  })
  .get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
      const customer = await CustomerService.getCustomerByID(id);
      res.status(200).send(customer);
    } catch (error) {
      res.status(400).send(error);
    }
  })
  .get('/:id/appointments', async (req, res) => {
    const { id } = req.params;

    try {
      const { dataValues } = await CustomerService.getCustomerWithAppointments(
        id
      );
      res.status(200).send(dataValues);
    } catch (error) {
      res.status(400).send(error);
    }
  })
  .post('/', async (req, res) => {
    try {
      const { dataValues } = await CustomerService.createCustomer(req.body);
      res.status(201).send(dataValues);
    } catch (error) {
      res.status(400).send(error);
    }
  })
  .put('/', async (req, res) => {
    try {
      const [updatedCustomer] = await CustomerService.updateCustomer(req.body);
      res.status(200).send(updatedCustomer);
    } catch (error) {
      res.status(400).send(error);
    }
  })
  .delete('/', async (req, res) => {
    try {
      const remainingCustomers = await CustomerService.deleteCustomers(
        req.body
      );
      res.status(200).send(remainingCustomers);
    } catch (error) {
      res.status(400).send(error);
    }
  });

module.exports = router;

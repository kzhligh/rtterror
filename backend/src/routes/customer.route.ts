import 'reflect-metadata';

import express from 'express';
import type { Request, Response } from 'express';
import type core from 'express-serve-static-core';
import { Container, Service } from 'typedi';

import { CustomerService } from 'src/services/customer.service';
import { Frozen } from 'src/utils/decorators';
import { Customer } from 'src/models/customer.model';

@Frozen()
@Service()
class CustomerController {
  constructor(private customerService: CustomerService) {}

  getRoutes(): express.Router {
    return express
      .Router()
      .get('/', this.getAllCustomers())
      .get('/duplicate', this.checkForDuplicateNamedCustomer())
      .get('/search', this.customerSearch())
      .get('/:id', this.getCustomerById())
      .get('/:id/appointments', this.getCustomerByIdWithAppointments())
      .post('/', this.createCustomer())
      .put('/', this.updateCustomer())
      .delete('/', this.deleteCustomer());
  }

  private getAllCustomers() {
    return async (
      req: Request<core.ParamsDictionary, null, null, { sortBy: string }>,
      res: Response
    ) => {
      const { sortBy } = req.query;
      try {
        const customers = await this.customerService.getAllCustomers(sortBy);
        res.status(200).send(customers);
      } catch (error) {
        console.error(error);

        res.status(400).send(error);
      }
    };
  }

  private checkForDuplicateNamedCustomer() {
    return async (
      req: Request<
        core.ParamsDictionary,
        { duplicate: boolean },
        null,
        { firstName: string; lastName: string }
      >,
      res: Response
    ) => {
      const { firstName, lastName } = req.query;

      try {
        const response = await this.customerService.checkDuplicateCustomer(
          firstName,
          lastName
        );

        res.status(200).send(response);
      } catch (error) {
        res.status(400).send(error);
      }
    };
  }

  private customerSearch() {
    return async (
      req: Request<
        core.ParamsDictionary,
        Array<typeof Customer>,
        null,
        { query: string }
      >,
      res: Response
    ) => {
      const { query } = req.query;

      try {
        const customers = await this.customerService.searchCustomer(query);
        res.status(200).send(customers);
      } catch (error) {
        res.status(400).send(error);
      }
    };
  }

  private getCustomerById() {
    return async (req: Request, res: Response) => {
      const { id } = req.params;

      try {
        const customer = await this.customerService.getCustomerById(id);
        res.status(200).send(customer?.toJSON());
      } catch (error) {
        res.status(400).send(error);
      }
    };
  }

  private getCustomerByIdWithAppointments() {
    return async (req: Request, res: Response) => {
      const { id } = req.params;

      try {
        const customer = await this.customerService.getCustomerWithAppointments(
          id
        );

        res.status(200).send(customer?.toJSON());
      } catch (error) {
        res.status(400).send(error);
      }
    };
  }

  private createCustomer() {
    return async (req: Request, res: Response) => {
      try {
        const customer = await this.customerService.createCustomer(req.body);
        res.status(201).send(customer.toJSON());
      } catch (error) {
        res.status(400).send(error);
      }
    };
  }

  private updateCustomer() {
    return async (req: Request, res: Response) => {
      try {
        const [updatedCustomer] = await this.customerService.updateCustomer(
          req.body
        );
        res.status(200).send(updatedCustomer);
      } catch (error) {
        res.status(400).send(error);
      }
    };
  }

  private deleteCustomer() {
    return async (req: Request, res: Response) => {
      try {
        const remainingCustomers = await this.customerService.deleteCustomers(
          req.body
        );
        res.status(200).send(remainingCustomers);
      } catch (error) {
        res.status(400).send(error);
      }
    };
  }
}

export const customerRouter = Container.get(CustomerController).getRoutes();

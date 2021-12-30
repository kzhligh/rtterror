import { Customer } from 'src/models/customer.model';
import { Frozen } from 'src/utils/decorators';
import { Service } from 'typedi';
import { Op, Order, Sequelize, Transaction } from 'sequelize';
import { Appointment } from 'src/models/appointment.model';

@Frozen()
@Service()
export class CustomerService {
  constructor(private sqlService: Sequelize) {}

  createCustomer(customer: any) {
    return Customer.create(customer);
  }

  getAllCustomers(sortBy?: string) {
    return Customer.findAll({
      order: (sortBy && [[sortBy, 'ASC']]) as Order | undefined,
    });
  }

  getCustomerById(customerId: string) {
    return Customer.findByPk(customerId);
  }

  async deleteCustomers(customers: Array<string | number>) {
    const t: Transaction = await this.sqlService.transaction();
    try {
      await Customer.destroy({
        where: {
          [Op.or]: customers.map((id) => ({ id })),
        },
        transaction: t,
      });
      const remainingCustomers = await Customer.findAll({ transaction: t });
      await t.commit();

      return remainingCustomers;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  updateCustomer(customer: any) {
    return Customer.upsert(customer);
  }

  searchCustomer(query: string) {
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
          phone: {
            [Op.startsWith]: query,
          },
        },
      },
    });
  }

  async checkDuplicateCustomer(firstName: string, lastName: string) {
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

  getCustomerWithAppointments(customerId: string) {
    return Customer.findByPk(customerId, {
      include: Appointment,
    });
  }
}

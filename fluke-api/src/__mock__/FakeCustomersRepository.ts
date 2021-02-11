import {
  ICreateCustomer,
  ICustomer,
  ICustomersRepository,
} from '../interfaces';

export default class FakeCustomersRepostory implements ICustomersRepository {
  private customers: ICustomer[] = [];

  async create(data: ICreateCustomer): Promise<ICustomer> {
    const customer = data as ICustomer;

    customer.availablePackages = {
      gb: 0,
      minutes: 0,
    };

    customer.orderedPackages = [];

    this.customers.push(customer);

    return customer;
  }

  async findByProperty(
    key: keyof ICustomer,
    value: string,
  ): Promise<ICustomer | undefined> {
    return this.customers.find(customer => customer[key] === value);
  }
}

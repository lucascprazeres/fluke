import { hash } from 'bcryptjs';
import { ObjectId } from 'mongodb';
import {
  ICreateCustomer,
  ICustomer,
  ICustomersRepository,
} from '../interfaces';

export default class FakeCustomersRepostory implements ICustomersRepository {
  private customers: ICustomer[] = [];

  async create(data: ICreateCustomer): Promise<ICustomer> {
    const customer = data as ICustomer;

    customer._id = new ObjectId();

    customer.availablePackages = {
      gb: 0,
      minutes: 0,
    };

    customer.orderedPackages = [];

    // the customer interface defines 'password' as optional, so it is necessary
    // to force the 'string only' type
    customer.password = customer.password || '';

    customer.password = await hash(customer.password, 8);

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

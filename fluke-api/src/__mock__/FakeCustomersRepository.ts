import { hash } from 'bcryptjs';
import { ObjectId } from 'mongodb';
import {
  ICreateCustomer,
  ICustomer,
  ICustomersRepository,
  IUpdateCurrentPackages,
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
    return this.customers.find(
      customer => String(customer[key]) === String(value),
    );
  }

  async incrementCurrentPackages({
    customerId,
    gb,
    minutes,
  }: IUpdateCurrentPackages): Promise<ICustomer> {
    const customerIndex = this.customers.findIndex(c =>
      c._id.equals(customerId),
    );

    this.customers[customerIndex].availablePackages.gb += gb;
    this.customers[customerIndex].availablePackages.minutes += minutes;

    return this.customers[customerIndex];
  }

  async remove(customerId: ObjectId): Promise<void> {
    const removedIndex = this.customers.findIndex(c =>
      c._id.equals(customerId),
    );

    this.customers.splice(removedIndex, 1);
  }
}

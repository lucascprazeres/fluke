import { hash } from 'bcryptjs';
import { ObjectId } from 'mongodb';
import {
  ICreateCustomer,
  ICustomer,
  ICustomersRepository,
  IUpdateCurrentPackages,
} from '../interfaces/customers';

export default class FakeCustomersRepository implements ICustomersRepository {
  private customers: ICustomer[] = [];

  async create(data: ICreateCustomer): Promise<ICustomer> {
    const customer = data as ICustomer;

    customer._id = new ObjectId();

    customer.availablePackages = {
      gb: 0,
      minutes: 0,
    };

    // the customer interface defines 'password' as optional, so it is necessary
    // to force the 'string only' type
    customer.password = customer.password || '';

    customer.password = await hash(customer.password, 8);

    this.customers.push(customer);

    return customer;
  }

  async findById(customerId: string): Promise<ICustomer | undefined> {
    return this.customers.find(c => String(c._id) === customerId);
  }

  async findByCommonProperty(
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

  async remove(customerId: string): Promise<void> {
    const removedIndex = this.customers.findIndex(c =>
      c._id.equals(customerId),
    );

    this.customers.splice(removedIndex, 1);
  }
}

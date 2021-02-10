import { hash } from 'bcryptjs';
import dbclient from '../database/connection';
import { CreateCustomer, Customer } from '../interfaces';

export default class CustomersRepository {
  // Responsible for error handling
  async create(data: CreateCustomer): Promise<Customer> {
    let customer;
    try {
      customer = await this.createCustomer(data);
    } catch (err) {
      console.log(err.message);
      // try again
      customer = await this.createCustomer(data);
    }

    return customer;
  }

  private async createCustomer(data: CreateCustomer): Promise<Customer> {
    await dbclient.connect();

    const encryptedPassword = await hash(data.password, 8);

    const queryResult = await dbclient
      .db()
      .collection('customers')
      .insertOne({
        name: data.name,
        email: data.email,
        CPF: data.password,
        phonenumber: data.phonenumber,
        password: encryptedPassword,
        availablePackets: {
          gb: 0,
          minutes: 0,
        },
        orderedPackets: [],
      });

    await dbclient.close();

    const customer = queryResult.ops[0];

    return customer;
  }
}

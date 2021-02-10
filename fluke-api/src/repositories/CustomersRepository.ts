import { hash } from 'bcryptjs';
import dbclient from '../database/connection';

interface CreateCustomer {
  name: string;
  email: string;
  CPF: string;
  phonenumber: string;
  password: string;
}

export default class CustomersRepository {
  // Responsible for error handling logic
  async create(data: CreateCustomer): Promise<any> {
    let customer;
    try {
      customer = await this.createCustomer(data);
    } catch (err) {
      console.log(err.message);
    }

    return customer;
  }

  private async createCustomer(data: CreateCustomer): Promise<any> {
    await dbclient.connect();

    const encryptedPassword = await hash(data.password, 8);

    const queryResult = await dbclient.db().collection('customers').insertOne({
      name: data.name,
      email: data.email,
      CPF: data.password,
      phonenumber: data.phonenumber,
      password: encryptedPassword,
    });
    await dbclient.close();

    const customer = queryResult.ops[0];

    return customer;
  }
}

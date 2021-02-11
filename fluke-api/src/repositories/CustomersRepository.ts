import { hash } from 'bcryptjs';
import dbclient from '../database/connection';
import { CreateCustomer, Customer } from '../interfaces';

export default class CustomersRepository {
  async create(data: CreateCustomer): Promise<Customer> {
    let customer;
    try {
      await dbclient.connect();

      const encryptedPassword = await hash(data.password, 8);

      const queryResult = await dbclient
        .db()
        .collection('customers')
        .insertOne({
          name: data.name,
          email: data.email,
          CPF: data.CPF,
          phonenumber: data.phonenumber,
          password: encryptedPassword,
          availablePackets: {
            gb: 0,
            minutes: 0,
          },
          orderedPackets: [],
        });

      await dbclient.close();

      [customer] = queryResult.ops;
    } catch (err) {
      console.log(err.message);
    }

    return customer;
  }
}

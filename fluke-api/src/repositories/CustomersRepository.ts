import { hash } from 'bcryptjs';
import { ObjectId } from 'mongodb';
import dbclient from '../database/connection';
import {
  ICreateCustomer,
  ICustomer,
  ICustomersRepository,
  IUpdateCurrentPackages,
} from '../interfaces/customers';

export default class CustomersRepository implements ICustomersRepository {
  async create(data: ICreateCustomer): Promise<ICustomer> {
    let customer;
    try {
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
          availablePackages: {
            gb: 0,
            minutes: 0,
          },
        });
      [customer] = queryResult.ops;
    } catch (err) {
      console.log(err.message);
    }

    return customer;
  }

  async remove(customerId: string): Promise<void> {
    const id = new ObjectId(customerId);
    await dbclient
      .db()
      .collection('customers')
      .findOneAndDelete({
        _id: { $where: ({ _id }: ICustomer) => _id.equals(id) },
      });
  }

  async findById(customerId: string): Promise<ICustomer | undefined> {
    let customer;
    const id = new ObjectId(customerId);
    try {
      customer = await dbclient.db().collection('customers').findOne(id);
    } catch (err) {
      console.log(err);
    }
    return customer;
  }

  async findByCommonProperty(
    key: keyof ICustomer,
    value: string,
  ): Promise<ICustomer | undefined> {
    let customer;
    try {
      customer = await dbclient
        .db()
        .collection('customers')
        .findOne({ [key]: value });
    } catch (err) {
      console.log(err);
    }

    return customer;
  }

  async incrementCurrentPackages({
    customerId,
    gb,
    minutes,
  }: IUpdateCurrentPackages): Promise<ICustomer> {
    const id = new ObjectId(customerId);
    const customer = await dbclient.db().collection('customers').findOne(id);

    const totalGb = customer.availablePackages.gb + gb;
    const totalMinutes = customer.availablePackages.minutes + minutes;

    const query = { _id: customer._id };
    const newValues = {
      $set: {
        availablePackages: {
          gb: totalGb,
          minutes: totalMinutes,
        },
      },
    };

    await dbclient.db().collection('customers').updateOne(query, newValues);

    return {} as ICustomer;
  }
}

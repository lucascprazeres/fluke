import { inject, injectable } from 'tsyringe';
import dbclient from '../database/connection';
import {
  ICreateOrder,
  ICustomersRepository,
  IOrder,
  IProductOrdersRepository,
} from '../interfaces';

@injectable()
export default class ProductOrdersRepository
  implements IProductOrdersRepository {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  async create({ customerId, gb, minutes }: ICreateOrder): Promise<IOrder> {
    const orderedAt = new Date();

    const result = await dbclient.db().collection('orders').insertOne({
      customerId,
      gb,
      minutes,
      orderedAt,
    });

    await this.customersRepository.incrementCurrentPackages({
      customerId,
      gb,
      minutes,
    });

    const [order] = result.ops;

    return order;
  }
}

import dbclient from '../database/connection';
import { ICreateOrder, IOrder, IProductOrdersRepository } from '../interfaces';

export default class ProductOrdersRepository
  implements IProductOrdersRepository {
  async create({ customerId, gb, minutes }: ICreateOrder): Promise<IOrder> {
    const orderedAt = new Date();

    const result = await dbclient.db().collection('orders').insertOne({
      customerId,
      gb,
      minutes,
      orderedAt,
    });

    const [order] = result.ops;

    return order;
  }
}

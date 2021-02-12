import {
  ICreateOrder,
  ICustomersRepository,
  IOrder,
  IProductOrdersRepository,
} from '../interfaces';

export default class FakeProductOrdersRepository
  implements IProductOrdersRepository {
  private customersRepository: ICustomersRepository;

  private orders: IOrder[] = [];

  constructor(customersRepository: ICustomersRepository) {
    this.customersRepository = customersRepository;
  }

  async create({ customerId, gb, minutes }: ICreateOrder): Promise<IOrder> {
    const order = {
      customerId,
      gb,
      minutes,
      orderedAt: new Date(),
    };

    const customer = await this.customersRepository.findByProperty(
      '_id',
      String(customerId),
    );

    const totalGb = customer?.availablePackages.gb || 0 + gb;
    const totalMinutes = customer?.availablePackages.minutes || 0 + minutes;

    this.orders.push(order);
    this.customersRepository.incrementCurrentPackages({
      customerId,
      gb: totalGb,
      minutes: totalMinutes,
    });

    return order;
  }
}

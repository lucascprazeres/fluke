import { inject, injectable } from 'tsyringe';
import AppError from '../errors/AppError';
import {
  IOrder,
  ICreateOrder,
  IProductOrdersRepository,
  IPlaceOrderService,
  ICustomersRepository,
} from '../interfaces';

@injectable()
export default class PlaceOrderService implements IPlaceOrderService {
  constructor(
    @inject('ProductOrdersRepository')
    private productOrdersRepository: IProductOrdersRepository,
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  async execute({ customerId, gb, minutes }: ICreateOrder): Promise<IOrder> {
    if (gb < 0 || minutes < 0) {
      throw new AppError(400, 'Invalid package value request.');
    }

    const foundCustomer = await this.customersRepository.findByProperty(
      '_id',
      String(customerId),
    );

    if (!foundCustomer) throw new AppError(400, 'Invalid customer id');

    const order = await this.productOrdersRepository.create({
      customerId,
      gb,
      minutes,
    });

    return order;
  }
}

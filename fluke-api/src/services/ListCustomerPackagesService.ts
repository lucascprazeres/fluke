import { inject, injectable } from 'tsyringe';
import { ObjectId } from 'mongodb';
import {
  ICustomersRepository,
  IListcustomerPackagesService,
  IPackageReport,
} from '../interfaces/customers';
import { IProductOrdersRepository } from '../interfaces/orders';
import AppError from '../errors/AppError';

@injectable()
export default class PlaceOrderService implements IListcustomerPackagesService {
  constructor(
    @inject('ProductOrdersRepository')
    private productOrdersRepository: IProductOrdersRepository,
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  async execute(id: string): Promise<IPackageReport> {
    const foundCustomer = await this.customersRepository.findById(id);

    if (!foundCustomer) throw new AppError(400, 'Invalid customer id');

    const { availablePackages } = foundCustomer;

    const orderedPackages = await this.productOrdersRepository.listAllFromCustomer(
      id,
    );

    const totalGb = orderedPackages.reduce((sum, { gb }) => {
      sum += gb;
      return sum;
    }, 0);

    const totalMinutes = orderedPackages.reduce((sum, { minutes }) => {
      sum += minutes;
      return sum;
    }, 0);

    const usedPackages = {
      gb: totalGb - availablePackages.gb,
      minutes: totalMinutes - availablePackages.minutes,
    };

    return {
      availablePackages,
      usedPackages,
      orderedPackages,
    };
  }
}

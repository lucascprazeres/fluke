import { inject, injectable } from 'tsyringe';
import {
  IUpdateCurrentPackages,
  ICustomersRepository,
  IUpdateCustomerPackagesService,
  ICustomer,
} from '../interfaces';

@injectable()
export default class UpdateCustomerPackagesService
  implements IUpdateCustomerPackagesService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  async execute({
    customerId,
    gb,
    minutes,
  }: IUpdateCurrentPackages): Promise<ICustomer> {
    const customer = await this.customersRepository.increaseCurrentPackages({
      customerId,
      gb,
      minutes,
    });
    return customer;
  }
}

import { inject, injectable } from 'tsyringe';
import AppError from '../errors/AppError';
import {
  ICustomer,
  ICreateCustomer,
  ICustomersRepository,
  IRegisterNewCostumerService,
} from '../interfaces/customers';

@injectable()
export default class RegisterNewCustomerService
  implements IRegisterNewCostumerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  async execute(data: ICreateCustomer): Promise<ICustomer> {
    const foundCustomerByCPF = await this.customersRepository.findByCommonProperty(
      'CPF',
      data.CPF,
    );

    if (foundCustomerByCPF) {
      throw new AppError(400, 'This CPF is already taken');
    }

    const foundCustomerByEmail = await this.customersRepository.findByCommonProperty(
      'email',
      data.email,
    );

    if (foundCustomerByEmail) {
      throw new AppError(400, 'This E-mail is already taken');
    }

    const customer = await this.customersRepository.create({
      name: data.name,
      email: data.email,
      CPF: data.CPF,
      phonenumber: data.phonenumber,
      password: data.password,
    });

    return customer;
  }
}

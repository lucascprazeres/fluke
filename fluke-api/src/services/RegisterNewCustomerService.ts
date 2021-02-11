import { inject, injectable } from 'tsyringe';
import {
  ICustomer,
  ICreateCustomer,
  ICustomersRepository,
  IRegisterNewCostumerService,
} from '../interfaces';

@injectable()
export default class RegisterNewCustomerService
  implements IRegisterNewCostumerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  async execute(data: ICreateCustomer): Promise<ICustomer> {
    const foundCustomerByCPF = await this.customersRepository.findByProperty(
      'CPF',
      data.CPF,
    );

    if (foundCustomerByCPF) {
      throw new Error('This CPF is already taken');
    }

    const foundCustomerByEmail = await this.customersRepository.findByProperty(
      'email',
      data.email,
    );

    if (foundCustomerByEmail) {
      throw new Error('This E-mail is already taken');
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

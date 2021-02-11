import { Customer, CreateCustomer } from '../interfaces';
import CustomersRepository from '../repositories/CustomersRepository';

export default class RegisterNewCustomerService {
  async execute(data: CreateCustomer): Promise<Customer> {
    const customersRepository = new CustomersRepository();

    const foundCustomerByCPF = await customersRepository.findByProperty(
      'CPF',
      data.CPF,
    );

    if (foundCustomerByCPF) {
      throw new Error('This CPF is already taken');
    }

    const foundCustomerByEmail = await customersRepository.findByProperty(
      'email',
      data.email,
    );

    if (foundCustomerByEmail) {
      throw new Error('This E-mail is already taken');
    }

    const customer = await customersRepository.create({
      name: data.name,
      email: data.email,
      CPF: data.CPF,
      phonenumber: data.phonenumber,
      password: data.password,
    });

    return customer;
  }
}

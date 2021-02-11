import { Request, Response } from 'express';
import CustomersRepository from '../repositories/CustomersRepository';

export default class CustomerController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, CPF, phonenumber, password } = request.body;

    const customersRepository = new CustomersRepository();

    const foundCustomerByCPF = await customersRepository.findByProperty(
      'CPF',
      CPF,
    );

    if (foundCustomerByCPF) {
      return response
        .status(400)
        .json({ status: 'error', message: 'This CPF is already taken' });
    }

    const foundCustomerByEmail = await customersRepository.findByProperty(
      'email',
      email,
    );

    if (foundCustomerByEmail) {
      return response
        .status(400)
        .json({ status: 'error', message: 'This E-mail is already taken' });
    }

    const customer = await customersRepository.create({
      name,
      email,
      CPF,
      phonenumber,
      password,
    });

    delete customer.password;

    return response.json(customer);
  }
}

import { Request, Response } from 'express';
import CustomersRepository from '../repositories/CustomersRepository';

export default class CustomerController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, CPF, phonenumber, password } = request.body;

    const customersRepository = new CustomersRepository();

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

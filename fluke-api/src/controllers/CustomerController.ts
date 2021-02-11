import { container } from 'tsyringe';
import { Request, Response } from 'express';
import RegisterNewCustomerService from '../services/RegisterNewCustomerService';

export default class CustomerController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, CPF, phonenumber, password } = request.body;

    const registerNewCustomer = container.resolve(RegisterNewCustomerService);

    const customer = await registerNewCustomer.execute({
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

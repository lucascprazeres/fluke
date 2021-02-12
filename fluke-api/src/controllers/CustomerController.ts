import { container } from 'tsyringe';
import { Request, Response } from 'express';
import RegisterNewCustomerService from '../services/RegisterNewCustomerService';
import ListCustomerPackagesService from '../services/ListCustomerPackagesService';

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

  async show(request: Request, response: Response): Promise<Response> {
    const customerId = request.body.user.id;

    const listCustomerPackages = container.resolve(ListCustomerPackagesService);

    const packageReport = await listCustomerPackages.execute(customerId);

    return response.json(packageReport);
  }
}

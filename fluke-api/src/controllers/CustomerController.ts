import { container } from 'tsyringe';
import { Request, Response } from 'express';
import RegisterNewCustomerService from '../services/RegisterNewCustomerService';

export default class CustomerController {
  async create(request: Request, response: Response): Promise<Response> {
    try {
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
    } catch (err) {
      console.log(err);
      return response
        .status(400)
        .json({ status: 'error', message: err.message });
    }
  }
}

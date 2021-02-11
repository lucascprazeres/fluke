import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AuthenticateCustomerService from '../services/AuthenticateCustomerService';

export default class SessionController {
  async create(request: Request, response: Response): Promise<Response> {
    const { CPF, password } = request.body;

    const authenticateCustomer = container.resolve(AuthenticateCustomerService);

    const { _id, token } = await authenticateCustomer.execute({
      CPF,
      password,
    });

    return response.json({ _id, token });
  }
}

import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AuthenticateCustomerService from '../services/AuthenticateCustomerService';

export default class SessionController {
  async create(request: Request, response: Response): Promise<Response> {
    try {
      const { CPF, password } = request.body;

      const authenticateCustomer = container.resolve(
        AuthenticateCustomerService,
      );

      const { _id, token } = await authenticateCustomer.execute({
        CPF,
        password,
      });

      return response.json({ _id, token });
    } catch (err) {
      console.log(err);
      return response
        .status(400)
        .json({ status: 'error', message: err.message });
    }
  }
}

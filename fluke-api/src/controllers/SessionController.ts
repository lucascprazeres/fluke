import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AuthenticateUserService from '../services/AuthenticateUserService';

export default class SessionController {
  async create(request: Request, response: Response): Promise<Response> {
    try {
      const { CPF, password } = request.body;

      const authenticateUser = container.resolve(AuthenticateUserService);

      const { _id, token } = await authenticateUser.execute({
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

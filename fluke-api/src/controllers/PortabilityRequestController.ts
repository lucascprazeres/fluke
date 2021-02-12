import { Request, Response } from 'express';
import { container } from 'tsyringe';
import RequestPortabiltyService from '../services/RequestPortabilityService';

export default class PortabilityRequestController {
  async create(request: Request, response: Response): Promise<Response> {
    const customerId = request.body.user.id;
    const { name, CPF, phonenumber } = request.body;

    const requestPortability = container.resolve(RequestPortabiltyService);

    const portabiltyRequest = await requestPortability.execute({
      customerId,
      name,
      CPF,
      phonenumber,
    });

    return response.json(portabiltyRequest);
  }
}

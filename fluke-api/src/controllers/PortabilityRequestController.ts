import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListPortabilityRequestsService from '../services/ListPortabilityRequestsService';
import RequestPortabiltyService from '../services/RequestPortabilityService';

export default class PortabilityRequestController {
  async index(request: Request, response: Response): Promise<Response> {
    const customerId = request.body.user.id;

    const listPortabilityRequests = container.resolve(
      ListPortabilityRequestsService,
    );

    const portabilityRequests = await listPortabilityRequests.execute(
      customerId,
    );

    return response.json(portabilityRequests);
  }

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

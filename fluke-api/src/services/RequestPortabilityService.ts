import { inject, injectable } from 'tsyringe';
import AppError from '../errors/AppError';
import { ICustomersRepository } from '../interfaces/customers';
import {
  IPortabilityRequest,
  IPortabilityRequestsRepository,
  IRequestPortability,
  IRequestPortabilityService,
} from '../interfaces/portablityRequests';

@injectable()
class RequestPortabiltyService implements IRequestPortabilityService {
  constructor(
    @inject('PortabilityRequestsRepository')
    private portabilityRequestsRepository: IPortabilityRequestsRepository,
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  async execute({
    customerId,
    name,
    CPF,
    phonenumber,
  }: IRequestPortability): Promise<IPortabilityRequest> {
    const foundCustomer = await this.customersRepository.findById(customerId);

    if (!foundCustomer) throw new AppError(400, 'Invalid customer id.');

    const foundPortabilityRequest = await this.portabilityRequestsRepository.findByPhonenumber(
      phonenumber,
    );

    if (foundPortabilityRequest) {
      throw new AppError(
        400,
        'A request was already made for this phonenumber.',
      );
    }

    const portabilityRequest = await this.portabilityRequestsRepository.create({
      customerId,
      name,
      CPF,
      phonenumber,
    });

    return portabilityRequest;
  }
}

export default RequestPortabiltyService;

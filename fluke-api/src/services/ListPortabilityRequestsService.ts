import { inject, injectable } from 'tsyringe';
import AppError from '../errors/AppError';
import { ICustomersRepository } from '../interfaces/customers';
import {
  IListPortabilityRequestsService,
  IPortabilityRequest,
  IPortabilityRequestsRepository,
} from '../interfaces/portablityRequests';

@injectable()
class ListPortabilityRequestsService
  implements IListPortabilityRequestsService {
  constructor(
    @inject('PortabilityRequestsRepository')
    private portabilityRequestsRepository: IPortabilityRequestsRepository,
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  async execute(customerId: string): Promise<IPortabilityRequest[]> {
    const foundCustomer = await this.customersRepository.findById(customerId);

    if (!foundCustomer) throw new AppError(400, 'Invalid customer id.');

    const portabilityRequests = await this.portabilityRequestsRepository.findAllFromCustomer(
      customerId,
    );

    return portabilityRequests;
  }
}

export default ListPortabilityRequestsService;

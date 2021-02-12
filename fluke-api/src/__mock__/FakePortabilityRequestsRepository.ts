import {
  IPortabilityRequest,
  IPortabilityRequestsRepository,
  IRequestPortability,
} from '../interfaces/portablityRequests';

export default class FakePortabilityRequestRepository
  implements IPortabilityRequestsRepository {
  private portabilityRequests: IPortabilityRequest[] = [];

  async create({
    customerId,
    name,
    CPF,
    phonenumber,
  }: IRequestPortability): Promise<IPortabilityRequest> {
    const portabilityRequest = {
      customerId,
      name,
      CPF,
      phonenumber,
      isOpen: true,
      requestedAt: new Date(),
    };

    this.portabilityRequests.push(portabilityRequest);

    return portabilityRequest;
  }

  async findAllFromCustomer(
    customerId: string,
  ): Promise<IPortabilityRequest[]> {
    return this.portabilityRequests.filter(pr => pr.customerId === customerId);
  }

  async findByPhonenumber(
    phonenumber: string,
  ): Promise<IPortabilityRequest | undefined> {
    return this.portabilityRequests.find(pr => pr.phonenumber === phonenumber);
  }
}

export interface IRequestPortability {
  customerId: string;
  name: string;
  CPF: string;
  phonenumber: string;
}

export interface IPortabilityRequest {
  customerId: string;
  name: string;
  CPF: string;
  phonenumber: string;
  isOpen: boolean;
  requestedAt: Date;
}

export interface IRequestPortabilityService {
  execute(data: IRequestPortability): Promise<IPortabilityRequest>;
}

export interface IListPortabilityRequestsService {
  execute(customerId: string): Promise<IPortabilityRequest[]>;
}

export interface IPortabilityRequestsRepository {
  create(data: IRequestPortability): Promise<IPortabilityRequest>;
  findAllFromCustomer(customerId: string): Promise<IPortabilityRequest[]>;
  findByPhonenumber(
    phonenumber: string,
  ): Promise<IPortabilityRequest | undefined>;
}

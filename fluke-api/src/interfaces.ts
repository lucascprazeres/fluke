export interface ICreateCustomer {
  name: string;
  email: string;
  CPF: string;
  phonenumber: string;
  password: string;
}

interface IPacketOrder {
  gp: number;
  minutes: number;
  orderedAt: Date;
}

export interface ICustomer {
  _id: Record<string, 'unknow'>; // similar to the "object" type
  name: string;
  email: string;
  CPF: string;
  phonenumber: string;
  password?: string;
  availablePackages: { gb: number; minutes: number };
  orderedPackages: IPacketOrder[];
}

export interface ICustomersRepository {
  create(data: ICreateCustomer): Promise<ICustomer>;
  findByProperty(
    key: keyof ICustomer,
    value: string,
  ): Promise<ICustomer | undefined>;
}

export interface IRegisterNewCostumerService {
  execute(data: ICreateCustomer): Promise<ICustomer>;
}

export interface IAuthenticateCustomer {
  CPF: string;
  password: string;
}

export interface IAuthenticationResponse {
  _id: Record<string, 'unknow'>;
  token: string;
}

export interface IAuthenticateCustomerService {
  execute(data: IAuthenticateCustomer): Promise<IAuthenticationResponse>;
}

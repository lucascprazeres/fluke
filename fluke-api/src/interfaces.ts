import { ObjectId } from 'mongodb';

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
  _id: ObjectId; // similar to the "object" type
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
  _id: ObjectId;
  token: string;
}

export interface IAuthenticateCustomerService {
  execute(data: IAuthenticateCustomer): Promise<IAuthenticationResponse>;
}

export interface ICreateOrder {
  customerId: ObjectId;
  gb: number;
  minutes: number;
}

export interface IOrder {
  customerId: ObjectId;
  gb: number;
  minutes: number;
  orderedAt: Date;
}

export interface IProductOrdersRepository {
  create(data: ICreateOrder): Promise<IOrder>;
  // listAllFromCustomer(id: ObjectId): Promise<IOrder[]>;
}

export interface IPlaceOrderService {
  execute(data: ICreateOrder): Promise<IOrder>;
}

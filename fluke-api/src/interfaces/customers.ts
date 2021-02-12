import { ObjectId } from 'mongodb';
import { IPacketOrder } from './orders';

export interface ICreateCustomer {
  name: string;
  email: string;
  CPF: string;
  phonenumber: string;
  password: string;
}

export interface IUpdateCurrentPackages {
  customerId: string;
  gb: number;
  minutes: number;
}

export interface ICustomer {
  _id: ObjectId; // similar to the "object" type
  name: string;
  email: string;
  CPF: string;
  phonenumber: string;
  password?: string;
  availablePackages: { gb: number; minutes: number };
}

export interface ICustomersRepository {
  create(data: ICreateCustomer): Promise<ICustomer>;
  findById(customerId: string): Promise<ICustomer | undefined>;
  findByCommonProperty(
    key: keyof ICustomer,
    value: string,
  ): Promise<ICustomer | undefined>;
  incrementCurrentPackages(data: IUpdateCurrentPackages): Promise<ICustomer>;
  remove(customerId: string): Promise<void>;
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

export interface IPackageReport {
  availablePackages: { gb: number; minutes: number };
  usedPackages: { gb: number; minutes: number };
  orderedPackages: IPacketOrder[];
}

export interface IListcustomerPackagesService {
  execute(customerId: string): Promise<IPackageReport>;
}

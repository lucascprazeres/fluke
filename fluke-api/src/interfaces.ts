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
  availablePackets: Omit<IPacketOrder, 'orderedAt'>;
  orderedPackets: IPacketOrder[];
}

export interface ICustomersRepository {
  create(data: ICreateCustomer): Promise<ICustomer>;
  findByProperty(key: string, value: string): Promise<ICustomer | undefined>;
}

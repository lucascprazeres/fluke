export interface CreateCustomer {
  name: string;
  email: string;
  CPF: string;
  phonenumber: string;
  password: string;
}

interface PacketOrder {
  gp: number;
  minutes: number;
  orderedAt: Date;
}

export interface Customer {
  _id: Record<string, 'unknow'>; // similar to the "object" type
  name: string;
  email: string;
  CPF: string;
  phonenumber: string;
  password?: string;
  availablePackets: Omit<PacketOrder, 'orderedAt'>;
  orderedPackets: PacketOrder[];
}

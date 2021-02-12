export interface IPacketOrder {
  gb: number;
  minutes: number;
  orderedAt: Date;
}

export interface ICreateOrder {
  customerId: string;
  gb: number;
  minutes: number;
}

export interface IOrder {
  customerId: string;
  gb: number;
  minutes: number;
  orderedAt: Date;
}

export interface IProductOrdersRepository {
  create(data: ICreateOrder): Promise<IOrder>;
  listAllFromCustomer(customerId: string): Promise<IOrder[]>;
}

export interface IPlaceOrderService {
  execute(data: ICreateOrder): Promise<IOrder>;
}

import { container } from 'tsyringe';
import ProductOrdersRepository from './repositories/ProductOrdersRepository';
import CustomersRepository from './repositories/CustomersRepository';
import PortabilityRequestsRepository from './repositories/PortabilityRequestsRepository';

container.registerSingleton('CustomersRepository', CustomersRepository);

container.registerSingleton(
  'PortabilityRequestsRepository',
  PortabilityRequestsRepository,
);

container.registerInstance(
  'ProductOrdersRepository',
  container.resolve(ProductOrdersRepository),
);

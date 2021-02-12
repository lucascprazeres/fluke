import { container } from 'tsyringe';
import ProductOrdersRepository from './repositories/ProductOrdersRepository';
import CustomersRepository from './repositories/CustomersRepository';

container.registerSingleton('CustomersRepository', CustomersRepository);

container.registerInstance(
  'ProductOrdersRepository',
  container.resolve(ProductOrdersRepository),
);

import { container } from 'tsyringe';
import CustomersRepository from './repositories/CustomersRepository';

container.registerSingleton('CustomersRepository', CustomersRepository);

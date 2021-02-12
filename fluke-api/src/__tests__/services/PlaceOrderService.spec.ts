import AppError from '../../errors/AppError';
import { ICustomersRepository } from '../../interfaces/customers';
import {
  IPlaceOrderService,
  IProductOrdersRepository,
} from '../../interfaces/orders';
import PlaceOrderService from '../../services/PlaceOrderService';
import FakeCustomersRepostory from '../../__mock__/FakeCustomersRepository';
import FakeProductOrdersRepository from '../../__mock__/FakeProductOrdersRepository';

let customersRepository: ICustomersRepository;
let productOrdersRepository: IProductOrdersRepository;
let placeOrder: IPlaceOrderService;

describe('PlaceOrderService', () => {
  beforeEach(() => {
    customersRepository = new FakeCustomersRepostory();
    productOrdersRepository = new FakeProductOrdersRepository(
      customersRepository,
    );
    placeOrder = new PlaceOrderService(
      productOrdersRepository,
      customersRepository,
    );
  });
  it('should be able to create a new order', async () => {
    const customer = await customersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      CPF: '123.456.789-10',
      phonenumber: '5555-5555',
      password: 'secret',
    });

    const customerId = String(customer._id);

    const order = await placeOrder.execute({
      customerId,
      gb: 10,
      minutes: 30,
    });

    expect(order).toHaveProperty('orderedAt');
    expect(order.gb).toBe(10);
    expect(order.minutes).toBe(30);
  });
  it('should be able to update customer available packages when creating a new order', async () => {
    const customer = await customersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      CPF: '123.456.789-10',
      phonenumber: '5555-5555',
      password: 'secret',
    });

    const customerId = String(customer._id);

    await placeOrder.execute({
      customerId,
      gb: 10,
      minutes: 30,
    });

    const updatedUser = await customersRepository.findById(customerId);

    expect(updatedUser?.availablePackages.gb).toBe(10);
    expect(updatedUser?.availablePackages.minutes).toBe(30);
  });

  it('should not be able to create a new order to invalid user', async () => {
    const customer = await customersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      CPF: '123.456.789-10',
      phonenumber: '5555-5555',
      password: 'secret',
    });

    const customerId = String(customer._id);

    await customersRepository.remove(customerId);

    await expect(
      placeOrder.execute({
        customerId,
        gb: 10,
        minutes: 30,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new order with invalid quantities', async () => {
    const customer = await customersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      CPF: '123.456.789-10',
      phonenumber: '5555-5555',
      password: 'secret',
    });

    const customerId = String(customer._id);

    await expect(
      placeOrder.execute({
        customerId,
        gb: -10,
        minutes: -30,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

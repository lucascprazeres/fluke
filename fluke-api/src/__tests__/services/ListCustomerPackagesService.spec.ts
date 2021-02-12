import {
  ICustomersRepository,
  IListcustomerPackagesService,
} from '../../interfaces/customers';
import { IProductOrdersRepository } from '../../interfaces/orders';
import FakeCustomersRepostory from '../../__mock__/FakeCustomersRepository';
import FakeProductOrdersRepository from '../../__mock__/FakeProductOrdersRepository';
import ListCustomerPackagesService from '../../services/ListCustomerPackagesService';
import AppError from '../../errors/AppError';

let customersRepository: ICustomersRepository;
let productOrdersRepository: IProductOrdersRepository;
let listCustomerPackages: IListcustomerPackagesService;

describe('ListCustomerPackagesService', () => {
  beforeEach(() => {
    customersRepository = new FakeCustomersRepostory();
    productOrdersRepository = new FakeProductOrdersRepository(
      customersRepository,
    );
    listCustomerPackages = new ListCustomerPackagesService(
      productOrdersRepository,
      customersRepository,
    );
  });

  it("should be able to list a customer's current packages", async () => {
    const customer = await customersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      CPF: '123.456.789-10',
      phonenumber: '5555-5555',
      password: 'secret',
    });

    const customerId = String(customer._id);

    await productOrdersRepository.create({
      customerId,
      gb: 10,
      minutes: 30,
    });

    const {
      availablePackages,
      orderedPackages,
      usedPackages,
    } = await listCustomerPackages.execute(customerId);

    const updatedCustomer = await customersRepository.findById(customerId);

    expect(availablePackages).toEqual(updatedCustomer?.availablePackages);

    expect(usedPackages).toEqual({
      gb: 0,
      minutes: 0,
    });

    expect(orderedPackages).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          customerId,
          gb: 10,
          minutes: 30,
        }),
      ]),
    );
  });

  it('should not be able to list an invalid customer current packages', async () => {
    await expect(
      listCustomerPackages.execute('invalidId'),
    ).rejects.toBeInstanceOf(AppError);
  });
});

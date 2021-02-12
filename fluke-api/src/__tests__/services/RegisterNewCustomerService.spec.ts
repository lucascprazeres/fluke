import { ICustomersRepository } from '../../interfaces';
import FakeCustomersRepository from '../../__mock__/FakeCustomersRepository';
import RegisterNewCustomerService from '../../services/RegisterNewCustomerService';
import AppError from '../../errors/AppError';

let customersRepository: ICustomersRepository;
let registerNewCustomer: RegisterNewCustomerService;

describe('RegisterNewCustomerService', () => {
  beforeEach(() => {
    customersRepository = new FakeCustomersRepository();
    registerNewCustomer = new RegisterNewCustomerService(customersRepository);
  });

  it('should be able to create a new customer', async () => {
    const customerData = {
      name: 'John Doe',
      email: 'johndoe@email.com',
      CPF: '123.456.789-10',
      phonenumber: '5555-5555',
      password: 'secret',
    };

    const customer = await registerNewCustomer.execute(customerData);

    expect(customer.CPF).toBe(customerData.CPF);
    expect(customer.email).toBe(customerData.email);
    expect(customer).toHaveProperty('availablePackages');
    expect(customer).toHaveProperty('orderedPackages');
  });

  it('should not be able to create a new customer with same CPF', async () => {
    const fisrtCustomerData = {
      name: 'John Doe',
      email: 'johndoe@email.com',
      CPF: '123.456.789-10',
      phonenumber: '5555-5555',
      password: 'secret',
    };

    await registerNewCustomer.execute(fisrtCustomerData);

    const secondCustomerData = {
      name: 'John Doe',
      email: 'anotheremail@email.com',
      CPF: '123.456.789-10',
      phonenumber: '5555-5555',
      password: 'secret',
    };

    await expect(
      registerNewCustomer.execute(secondCustomerData),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new customer with same E-mail', async () => {
    const fisrtCustomerData = {
      name: 'John Doe',
      email: 'johndoe@email.com',
      CPF: '123.456.789-10',
      phonenumber: '5555-5555',
      password: 'secret',
    };

    await registerNewCustomer.execute(fisrtCustomerData);

    const secondCustomerData = {
      name: 'John Doe',
      email: 'johndoe@email.com',
      CPF: '000.000.000-00',
      phonenumber: '5555-5555',
      password: 'secret',
    };

    await expect(
      registerNewCustomer.execute(secondCustomerData),
    ).rejects.toBeInstanceOf(AppError);
  });
});

import AppError from '../../errors/AppError';
import {
  IAuthenticateCustomerService,
  ICustomersRepository,
} from '../../interfaces/customers';
import AuthenticateCustomerService from '../../services/AuthenticateCustomerService';
import FakeCustomersRepository from '../../__mock__/FakeCustomersRepository';

let customersRepository: ICustomersRepository;
let authenticateCustomer: IAuthenticateCustomerService;

describe('AuthenticateCustomerService', () => {
  beforeEach(() => {
    customersRepository = new FakeCustomersRepository();
    authenticateCustomer = new AuthenticateCustomerService(customersRepository);
  });

  it('should be able to authenticate customer', async () => {
    const createdCustomer = await customersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      CPF: '111.111.111-11',
      phonenumber: '5555-5555',
      password: 'secret',
    });

    const { _id, token } = await authenticateCustomer.execute({
      CPF: '111.111.111-11',
      password: 'secret',
    });

    expect(_id).toEqual(createdCustomer._id);
    expect(token).toBeTruthy();
  });

  it('should not be able to authenticate customer with wrong credentials', async () => {
    await customersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      CPF: '111.111.111-11',
      phonenumber: '5555-5555',
      password: 'secret',
    });

    await expect(
      authenticateCustomer.execute({
        CPF: '111.111.111-11',
        password: 'wrong password',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      authenticateCustomer.execute({
        CPF: '222.222.222-22',
        password: 'secret',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

import { ICustomersRepository } from '../../interfaces/customers';
import { IPortabilityRequestsRepository } from '../../interfaces/portablityRequests';
import FakeCustomersRepository from '../../__mock__/FakeCustomersRepository';
import FakePortabilityRequestRepository from '../../__mock__/FakePortabilityRequestsRepository';
import ListPortabilityRequestsService from '../../services/ListPortabilityRequestsService';
import AppError from '../../errors/AppError';

let portabilityRequestsRepository: IPortabilityRequestsRepository;
let customersRepository: ICustomersRepository;
let listPortabilities: ListPortabilityRequestsService;

describe('ListPortabilityRequestsService', () => {
  beforeEach(() => {
    portabilityRequestsRepository = new FakePortabilityRequestRepository();
    customersRepository = new FakeCustomersRepository();
    listPortabilities = new ListPortabilityRequestsService(
      portabilityRequestsRepository,
      customersRepository,
    );
  });

  it('should be able to list all portabilites of a customer', async () => {
    const customer = await customersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      CPF: '111.111.111-11',
      phonenumber: '5555-5555',
      password: 'secret',
    });

    const customerId = String(customer._id);

    await portabilityRequestsRepository.create({
      customerId,
      name: 'John Doe',
      CPF: '111.111.111-11',
      phonenumber: '5555-5555',
    });

    await portabilityRequestsRepository.create({
      customerId,
      name: 'John Doe',
      CPF: '111.111.111-11',
      phonenumber: '6666-6666',
    });

    const portabilities = await listPortabilities.execute(customerId);

    expect(portabilities).toHaveLength(2);
    expect(portabilities).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          customerId,
          name: 'John Doe',
          CPF: '111.111.111-11',
          phonenumber: '5555-5555',
        }),
      ]),
    );
  });

  it('should not be able to list portabilities of an invalid customer', async () => {
    await expect(listPortabilities.execute('invalidId')).rejects.toBeInstanceOf(
      AppError,
    );
  });
});

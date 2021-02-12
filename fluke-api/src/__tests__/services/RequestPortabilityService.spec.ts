import AppError from '../../errors/AppError';
import { ICustomersRepository } from '../../interfaces/customers';
import { IPortabilityRequestsRepository } from '../../interfaces/portablityRequests';
import RequestPortabiltyService from '../../services/RequestPortabilityService';
import FakeCustomersRepository from '../../__mock__/FakeCustomersRepository';
import FakePortabilityRequestRepository from '../../__mock__/FakePortabilityRequestsRepository';

let portabilityRequestsRepository: IPortabilityRequestsRepository;
let customersRepository: ICustomersRepository;
let requestPortability: RequestPortabiltyService;

describe('RequestPortabilityService', () => {
  beforeEach(() => {
    portabilityRequestsRepository = new FakePortabilityRequestRepository();
    customersRepository = new FakeCustomersRepository();
    requestPortability = new RequestPortabiltyService(
      portabilityRequestsRepository,
      customersRepository,
    );
  });

  it('should be able to create a portability request', async () => {
    const customer = await customersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      CPF: '111.111.111-11',
      phonenumber: '5555-5555',
      password: 'secret',
    });

    const portabilityRequest = await requestPortability.execute({
      customerId: String(customer._id),
      name: 'John Doe',
      CPF: '111.111.111-11',
      phonenumber: '5555-5555',
    });

    expect(portabilityRequest.isOpen).toBeTruthy();
    expect(portabilityRequest.customerId).toBe(String(customer._id));
  });

  it('should not be able to create two portability requests for the same phonenumber', async () => {
    const customer = await customersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      CPF: '111.111.111-11',
      phonenumber: '5555-5555',
      password: 'secret',
    });

    await requestPortability.execute({
      customerId: String(customer._id),
      name: 'John Doe',
      CPF: '111.111.111-11',
      phonenumber: '5555-5555',
    });

    await expect(
      requestPortability.execute({
        customerId: String(customer._id),
        name: 'John Doe',
        CPF: '111.111.111-11',
        phonenumber: '5555-5555',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to to create a portability request for an invalid customer', async () => {
    await expect(
      requestPortability.execute({
        customerId: 'invalidId',
        name: 'John Doe',
        CPF: '111.111.111-11',
        phonenumber: '5555-5555',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

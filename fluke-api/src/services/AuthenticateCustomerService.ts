import { inject, injectable } from 'tsyringe';
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {
  IAuthenticateCustomer,
  IAuthenticateCustomerService,
  IAuthenticationResponse,
  ICustomersRepository,
} from '../interfaces';

@injectable()
export default class AuthenticateCustomerService
  implements IAuthenticateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  async execute(data: IAuthenticateCustomer): Promise<IAuthenticationResponse> {
    const { CPF, password } = data;

    const foundCustomer = await this.customersRepository.findByProperty(
      'CPF',
      CPF,
    );

    if (!foundCustomer) throw new Error('Wrong CPF or password.');

    // the customer interface defines 'password' as optional, so it is necessary
    // to force the 'string only' type
    foundCustomer.password = foundCustomer.password || '';

    const passwordsMatch = await compare(password, foundCustomer.password);

    if (!passwordsMatch) throw new Error('Wrong CPF or password.');

    const { _id } = foundCustomer;

    const token = jwt.sign({}, 'temporary_secret', {
      subject: String(_id),
      expiresIn: '2d',
    });

    return { _id, token };
  }
}

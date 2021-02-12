import { inject, injectable } from 'tsyringe';
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import AppError from '../errors/AppError';
import {
  IAuthenticateCustomer,
  IAuthenticateCustomerService,
  IAuthenticationResponse,
  ICustomersRepository,
} from '../interfaces/customers';

import authConfig from '../config/authConfig';

@injectable()
export default class AuthenticateCustomerService
  implements IAuthenticateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  async execute(data: IAuthenticateCustomer): Promise<IAuthenticationResponse> {
    const { CPF, password } = data;

    const foundCustomer = await this.customersRepository.findByCommonProperty(
      'CPF',
      CPF,
    );

    if (!foundCustomer) throw new AppError(400, 'Wrong CPF or password.');

    // the customer interface defines 'password' as optional, so it is necessary
    // to force the 'string only' type
    foundCustomer.password = foundCustomer.password || '';

    const passwordsMatch = await compare(password, foundCustomer.password);

    if (!passwordsMatch) throw new AppError(400, 'Wrong CPF or password.');

    const { _id } = foundCustomer;

    const { secret, expiration } = authConfig.jwt;

    const token = jwt.sign({}, secret, {
      subject: String(_id),
      expiresIn: expiration,
    });

    return { _id, token };
  }
}

import {
  IPortabilityRequest,
  IPortabilityRequestsRepository,
  IRequestPortability,
} from '../interfaces/portablityRequests';

import dbclient from '../database/connection';

class PortabilityRequestsRepository implements IPortabilityRequestsRepository {
  async create({
    customerId,
    name,
    CPF,
    phonenumber,
  }: IRequestPortability): Promise<IPortabilityRequest> {
    const result = await dbclient
      .db()
      .collection('portability_requests')
      .insertOne({
        customerId,
        name,
        CPF,
        phonenumber,
        isOpen: true,
        requestedAt: new Date(),
      });

    const [portablityRequest] = result.ops;

    return portablityRequest;
  }

  async findByPhonenumber(
    phonenumber: string,
  ): Promise<IPortabilityRequest | undefined> {
    const portabilityRequest = await dbclient
      .db()
      .collection('portability_requests')
      .findOne({ phonenumber });

    return portabilityRequest;
  }
}

export default PortabilityRequestsRepository;

import { Router } from 'express';
import { hash } from 'bcryptjs';
import dbclient from './database/connection';

const routes = Router();

routes.post('/registerNewCostumer', async (request, response) => {
  const { name, email, CPF, phonenumber, password } = request.body;

  let queryResult;

  try {
    await dbclient.connect();

    const encryptedPassword = await hash(password, 8);

    queryResult = await dbclient.db().collection('customers').insertOne({
      name,
      email,
      CPF,
      phonenumber,
      password: encryptedPassword,
    });

    await dbclient.close();
  } catch (err) {
    console.log(err);
  }

  const customer = queryResult?.ops[0];

  delete customer.password;

  return response.json(customer);
});

routes.get('/pipipi', (request, response) => {
  return response.json({ message: 'popopo' });
});

export default routes;

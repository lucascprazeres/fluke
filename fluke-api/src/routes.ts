import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import CustomerController from './controllers/CustomerController';
import SessionController from './controllers/SessionController';

const routes = Router();
const customerController = new CustomerController();
const sessionController = new SessionController();

const createCustomerValidationSchema = {
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    CPF: Joi.string().required(),
    phonenumber: Joi.string().required(),
    password: Joi.string().required(),
  },
};

routes.post(
  '/registerNewCostumer',
  celebrate(createCustomerValidationSchema, { abortEarly: false }),
  customerController.create,
);

routes.post('/authenticate', sessionController.create);

routes.get('/pipipi', (request, response) => {
  return response.json({ message: 'popopo' });
});

export default routes;

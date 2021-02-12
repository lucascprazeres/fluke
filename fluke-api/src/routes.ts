import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from './middlewares/ensureAuthenticated';

import CustomerController from './controllers/CustomerController';
import SessionController from './controllers/SessionController';
import ProductOrdersController from './controllers/ProductOrdersController';
import PortabilityRequestController from './controllers/PortabilityRequestController';

const routes = Router();
const customerController = new CustomerController();
const sessionController = new SessionController();
const productOrdersController = new ProductOrdersController();
const portabilityRequestController = new PortabilityRequestController();

const createCustomerValidationSchema = {
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    CPF: Joi.string().required(),
    phonenumber: Joi.string().required(),
    password: Joi.string().required(),
  },
};

const authenticateCustomerValidationSchema = {
  [Segments.BODY]: {
    CPF: Joi.string().required(),
    password: Joi.string().required(),
  },
};

const productsOrderValidationSchema = {
  [Segments.BODY]: {
    gb: Joi.number().required(),
    minutes: Joi.number().required(),
  },
};

const portabiltyRequestValidationSchema = {
  [Segments.BODY]: {
    name: Joi.string().required(),
    CPF: Joi.string().required(),
    phonenumber: Joi.string().required(),
  },
};

routes.post(
  '/registerNewCostumer',
  celebrate(createCustomerValidationSchema, { abortEarly: false }),
  customerController.create,
);

routes.post(
  '/authenticate',
  celebrate(authenticateCustomerValidationSchema),
  sessionController.create,
);

routes.post(
  '/productsOrder',
  celebrate(productsOrderValidationSchema),
  ensureAuthenticated,
  productOrdersController.create,
);

routes.post(
  '/portabilityRequest',
  celebrate(portabiltyRequestValidationSchema),
  ensureAuthenticated,
  portabilityRequestController.create,
);

routes.get('/currentPackage', ensureAuthenticated, customerController.show);

routes.get(
  '/portabilities',
  ensureAuthenticated,
  portabilityRequestController.index,
);

routes.get('/pipipi', (request, response) => {
  return response.json({ message: 'popopo' });
});

export default routes;

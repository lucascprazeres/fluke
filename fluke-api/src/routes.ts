import { Router } from 'express';
import CustomerController from './controllers/CustomerController';

const routes = Router();
const customerController = new CustomerController();

routes.post('/registerNewCostumer', customerController.create);

routes.get('/pipipi', (request, response) => {
  return response.json({ message: 'popopo' });
});

export default routes;

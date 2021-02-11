import { Request, Response } from 'express';
import { container } from 'tsyringe';
import PlaceOrderService from '../services/PlaceOrderService';

export default class ProductOrdersController {
  async create(request: Request, response: Response): Promise<Response> {
    const { gb, minutes } = request.body;
    const customerId = request.body.user.id;

    const placeOrder = container.resolve(PlaceOrderService);

    const order = await placeOrder.execute({ customerId, gb, minutes });

    return response.json(order);
  }
}

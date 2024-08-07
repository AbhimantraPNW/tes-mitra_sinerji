import { createCustomerService } from '@/services/customer/create-customer.service';
import { getCustomersService } from '@/services/customer/get-customers.service';
import { NextFunction, Request, Response } from 'express';

export class CustomerController {
  async createCustomerController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const result = await createCustomerService(req.body);
      
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async getCustomersController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const result = await getCustomersService();
      
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}

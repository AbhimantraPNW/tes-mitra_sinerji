import { createTxService } from '@/services/tx/create-tx.service';
import { getTxService } from '@/services/tx/get-tx.service';
import { NextFunction, Request, Response } from 'express';

export class TxController {
  async createTransactionController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const result = await createTxService(req.body);
      
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async getTransactionsController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const query = {
        take: parseInt(req.query.take as string) || 10,
        page: parseInt(req.query.page as string) || 1,
        sortBy: (req.query.sortBy as string) || 'createdAt',
        sortOrder: (req.query.sortOrder as string) || 'asc',
        search: (req.query.search as string) || '',
      };

      const result = await getTxService(query)
      
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}

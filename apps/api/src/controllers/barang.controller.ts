import { createBarangService } from '@/services/barang/create-barang.service';
import { getBarangService } from '@/services/barang/get-barang.service';
import { getBarangsService } from '@/services/barang/get-barangs.service';
import { NextFunction, Request, Response } from 'express';

export class BarangController {
  async createBarangController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const result = await createBarangService(req.body);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async getBarangsController(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await getBarangsService();
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async getBarangController(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;

      const result = await getBarangService(Number(id));
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}

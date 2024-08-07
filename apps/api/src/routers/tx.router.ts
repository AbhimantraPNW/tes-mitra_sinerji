import { TxController } from "@/controllers/tx.controller";
import { Router } from "express";

export class TxRouter {
  private router: Router;
  private txController: TxController;

  constructor() {
    this.txController = new TxController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {

    this.router.get("/", this.txController.getTransactionsController)
    this.router.post("/", this.txController.createTransactionController)
  }

  getRouter(): Router {
    return this.router;
  }
}

import { CustomerController } from "@/controllers/customer.controller";
import { Router } from "express";

export class CustomerRouter {
  private router: Router;
  private customerController: CustomerController;

  constructor() {
    this.customerController = new CustomerController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get("/", this.customerController.getCustomersController)
    this.router.post("/", this.customerController.createCustomerController)
  }

  getRouter(): Router {
    return this.router;
  }
}

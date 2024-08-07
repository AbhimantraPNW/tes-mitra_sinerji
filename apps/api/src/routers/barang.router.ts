import { BarangController } from "@/controllers/barang.controller";
import { Router } from "express";

export class BarangRouter {
  private router: Router;
  private barangController: BarangController;

  constructor() {
    this.barangController = new BarangController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get("/:id", this.barangController.getBarangController)
    this.router.get("/", this.barangController.getBarangsController)
    this.router.post("/", this.barangController.createBarangController)
  }

  getRouter(): Router {
    return this.router;
  }
}

import { Router } from "express";
import { RoleController } from "./controller";
import { RoleService } from "../services/role.service";

export class RoleRoutes {
  static get routes(): Router {
    const router = Router();
    const rolerService = new RoleService();
    const controller = new RoleController(rolerService);

    router.post("/", controller.createRole);
    router.put("/:id", controller.updateRole);
    router.get("/", controller.getRoles);
    router.get("/:id", controller.getRole);

    return router;
  }
}

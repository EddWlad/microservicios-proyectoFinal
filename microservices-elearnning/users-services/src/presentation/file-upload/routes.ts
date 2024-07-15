import { Router } from "express";
import { FileUploadController } from "./controller";

import { AuthMiddleware } from "../middlewares/auth.middlewares";
import { FileUploadService } from "../services/file-upload.service";
import { FileUploadMiddleware } from "../middlewares/file-upload.middleware";
import { TypeMiddleware } from "../middlewares/type.middleware";
import { UploadAdapter, Uuid, envs } from "../../config";
import { PermissionsMiddleware } from "../middlewares/permissions.middlewares";

export class FileUploadRoutes {
  static get routes(): Router {
    const router = Router();
    const uploadAdapter = new UploadAdapter();
    const services = new FileUploadService(uploadAdapter);
    const controller = new FileUploadController(services);

    router.use([FileUploadMiddleware.containFiles, TypeMiddleware.validTypes(envs.TYPES)]);
    router.post("/single/:type", [AuthMiddleware.validateJWT,PermissionsMiddleware.validateRole],controller.uploadFile);
    router.post("/multiple/:type", [AuthMiddleware.validateJWT,PermissionsMiddleware.validateRole],controller.uploadMultipleFile);

    return router;
  }
}

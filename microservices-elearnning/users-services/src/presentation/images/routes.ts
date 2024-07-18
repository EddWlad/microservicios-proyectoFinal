import { Router } from "express";
import { FilesController } from "./controller";
import { FileService } from "../services/file.service";
import { UploadAdapter } from "../../config";

export class FilesRoutes {
  static get routes(): Router {
    const router = Router();
    const uploadAdapter = new UploadAdapter();
    const service  = new FileService(uploadAdapter);
    const controller = new FilesController(service);

    router.get("/:type/:file", controller.getFile);

    return router;
  }
}

import { Router } from "express";
import { UserController } from "./controller";
import { UserService } from "../services/user.service";
import { EmailService } from "../services/email.service";
import { envs } from "../../config";

export class UserRoutes {
  static get routes(): Router {
    const router = Router();

    const emailService = new EmailService(
      envs.MAILER_SERVICE,
      envs.MAILER_EMAIL,
      envs.MAILER_SECRET_KEY,
      envs.SEND_EMAIL
    );
    const userService = new UserService(emailService, envs.WEBSERVICES_URL);
    const controller = new UserController(userService);

    router.get("/", controller.getUsers);
    router.post("/", controller.createUser);
    router.put("/:id", controller.updateUser);
    router.get("/:id",controller.getUser);

    router.get("/validate-email/:token", controller.valiateEmail);

    return router;
  }
}

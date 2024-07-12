import { Router } from "express";
import { AuthController } from "./controller";
import { AuthService } from "../services/auth.service";
import { AuthMiddleware } from "../middlewares/auth.middlewares";

export class AuthRoutes {
    static get routes(): Router {
        const router = Router();
        const authService = new AuthService()
        const controller = new AuthController(authService);

        router.post('/login',controller.loginUser);
        router.get('/renew',[AuthMiddleware.validateJWT],controller.renewToken);

        return router;
    }
}
import { Router } from "express";
import { createSessionController } from "../controllers/login/session.Controllers";
import { validateUserFirstLogin } from "../middlewares/validateFirstLogin.middleware";
import { validateSchemaMiddleware } from "../middlewares/validateSchema.middleware";
import { validateUserActive } from "../middlewares/validateUserActive.middleware";
import { loginSchema } from "../schemas/login.schema";

const routes = Router();
export const loginRoutes = () => {
  routes.post(
    "/",
    validateSchemaMiddleware(loginSchema),
    createSessionController
  );
  return routes;
};

import { Router } from "express";
import { createSessionController } from "../controllers/login/session.Controllers";
import { validateSchemaMiddleware } from "../middlewares/validateSchema.middleware";
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

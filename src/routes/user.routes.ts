import { Router } from "express";

import createUserController from "../controllers/users/createUser.controller";
import { validateSchemaMiddleware } from "../middlewares/validateSchema.middleware";
import userSchema from "../schemas/user.schema";

const userRoutes = Router();

userRoutes.post(
  "/",
  validateSchemaMiddleware(userSchema),
  createUserController
);

export default userRoutes;

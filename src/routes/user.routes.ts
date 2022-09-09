import { Router } from "express";

import createUserController from "../controllers/users/createUser.controller";
import deleteUserController from "../controllers/users/deleteUser.controller";
import { validateSchemaMiddleware } from "../middlewares/validateSchema.middleware";
import { ensureAuth } from "../middlewares/validateToken.middleware";
import userSchema from "../schemas/user.schema";

const userRoutes = Router();

userRoutes.post(
  "/register",
  validateSchemaMiddleware(userSchema),
  createUserController
);

userRoutes.patch("/delete", ensureAuth, deleteUserController);

export default userRoutes;

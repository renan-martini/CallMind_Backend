import { Router } from "express";
import createSchedulesController from "../controllers/psychologists/createSchedules.controller";
import { validateUserFirstLogin } from "../middlewares/validateFirstLogin.middleware";
import { validateSchedule } from "../middlewares/validateSchedule.middleware";
import { validateSchemaMiddleware } from "../middlewares/validateSchema.middleware";
import { ensureAuth } from "../middlewares/validateToken.middleware";
import { validateUserActive } from "../middlewares/validateUserActive.middleware";
import { validateUserType } from "../middlewares/validateUserType.middleware";
import schedulesSchema from "../schemas/schedules.schema";
import { psychologist } from "../utils/utils";

const schedulesRoutes = Router();

schedulesRoutes.post(
  "",
  ensureAuth,
  validateUserActive,
  validateUserFirstLogin,
  validateUserType(psychologist),
  validateSchemaMiddleware(schedulesSchema),
  validateSchedule,
  createSchedulesController
);

export default schedulesRoutes;

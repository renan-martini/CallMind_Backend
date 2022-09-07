import { Router } from "express";
import listSchedulesController from "../controllers/schedules/listSchedules.controller";
import { validateUserFirstLogin } from "../middlewares/validateFirstLogin.middleware";
import { ensureAuth } from "../middlewares/validateToken.middleware";
import createSchedulesController from "../controllers/psychologists/createSchedules.controller";
import { validateSchedule } from "../middlewares/validateSchedule.middleware";
import { validateSchemaMiddleware } from "../middlewares/validateSchema.middleware";
import { validateUserActive } from "../middlewares/validateUserActive.middleware";
import { validateUserType } from "../middlewares/validateUserType.middleware";
import schedulesSchema from "../schemas/schedules.schema";
import { psychologist } from "../utils/utils";

const schedulesRouter = Router();

schedulesRouter.get(
  "/",
  ensureAuth,
  validateUserFirstLogin,
  listSchedulesController
);

schedulesRouter.post(
  "",
  ensureAuth,
  validateUserActive,
  validateUserFirstLogin,
  validateUserType(psychologist),
  validateSchemaMiddleware(schedulesSchema),
  validateSchedule,
  createSchedulesController
);

export default schedulesRouter;

import { Router } from "express";

import deleteSchedulesController from "../controllers/schedules/deleteSchedules.controller";
import editScheduleController from "../controllers/schedules/editSchedules.controller";
import listSchedulesController from "../controllers/schedules/listSchedules.controller";
import { validateUserFirstLogin } from "../middlewares/validateFirstLogin.middleware";
import { ensureAuth } from "../middlewares/validateToken.middleware";
import { validateSchedule } from "../middlewares/validateSchedule.middleware";
import { validateSchemaMiddleware } from "../middlewares/validateSchema.middleware";
import { validateUserActive } from "../middlewares/validateUserActive.middleware";
import { validateUserType } from "../middlewares/validateUserType.middleware";
import schedulesSchema from "../schemas/schedules.schema";
import { patient, psychologist } from "../utils/utils";
import createSchedulesController from "../controllers/schedules/createSchedules.controller";
import listSchedulesOfPsychologistIdAndDateController from "../controllers/schedules/listSchedulesOfPsychologistIdAndDate.controller";

const schedulesRouter = Router();

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

schedulesRouter.get(
  "/",
  ensureAuth,
  validateUserActive,
  validateUserFirstLogin,
  listSchedulesController
);

schedulesRouter.patch(
  "/:id",
  ensureAuth,
  validateUserActive,
  validateUserFirstLogin,
  validateUserType(patient),
  editScheduleController
);

schedulesRouter.delete(
  "/:id",
  ensureAuth,
  validateUserActive,
  validateUserFirstLogin,
  validateUserType(psychologist),
  deleteSchedulesController
);

schedulesRouter.get(
  "/psychologist/:psychologist_id/date/:date",
  ensureAuth,
  validateUserActive,
  validateUserFirstLogin,
  validateUserType(patient),
  listSchedulesOfPsychologistIdAndDateController
);

export default schedulesRouter;

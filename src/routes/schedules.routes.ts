import { Router } from "express";
import { validate } from "uuid";
import editScheduleController from "../controllers/schedules/editSchedules.controller";
import listSchedulesController from "../controllers/schedules/listSchedules.controller";
import { validateUserFirstLogin } from "../middlewares/validateFirstLogin.middleware";
import { ensureAuth } from "../middlewares/validateToken.middleware";
import { validateUserType } from "../middlewares/validateUserType.middleware";
import { patient } from "../utils/utils";

const schedulesRouter = Router();

schedulesRouter.get(
  "/",
  ensureAuth,
  validateUserFirstLogin,
  listSchedulesController
);
schedulesRouter.post(
  "/:id",
  ensureAuth,
  validateUserFirstLogin,
  validateUserType(patient),
  editScheduleController
);

export default schedulesRouter;

import { Router } from "express";
import createPsychologistPerfilController from "../controllers/psychologists/createPsychologistPerfil.controller";
import listPatientsController from "../controllers/psychologists/listPatients.controller";
import { validateSchemaMiddleware } from "../middlewares/validateSchema.middleware";
import { ensureAuth } from "../middlewares/validateToken.middleware";
import { validateUserType } from "../middlewares/validateUserType.middleware";
import psychologistSchema from "../schemas/psychologist.schema";
import schedulesSchema from "../schemas/schedules.schema";
import { psychologist } from "../utils/utils";

const psyRouter = Router();

psyRouter.post(
  "",
  validateSchemaMiddleware(psychologistSchema),
  ensureAuth,
  validateUserType(psychologist),
  createPsychologistPerfilController
);
psyRouter.get(
  "",
  ensureAuth,
  validateUserType(psychologist),
  listPatientsController
);

export default psyRouter;

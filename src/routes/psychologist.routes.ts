import { Router } from "express";
import createPsychologistPerfilController from "../controllers/psychologists/createPsychologistPerfil.controller";
import listOnePatientController from "../controllers/psychologists/listOnePatient.controller";
import listPatientsController from "../controllers/psychologists/listPatients.controller";
import deleteUserController from "../controllers/users/deleteUser.controller";
import { validateSchemaMiddleware } from "../middlewares/validateSchema.middleware";
import { validateUserFirstLogin } from "../middlewares/validateFirstLogin.middleware";
import { validateUserActive } from "../middlewares/validateUserActive.middleware";
import { ensureAuth } from "../middlewares/validateToken.middleware";
import { validateUserType } from "../middlewares/validateUserType.middleware";
import psychologistSchema from "../schemas/psychologist.schema";
import { psychologist } from "../utils/utils";

const psyRouter = Router();

psyRouter.post(
  "",
  validateSchemaMiddleware(psychologistSchema),
  ensureAuth,
  validateUserActive,
  validateUserType(psychologist),
  createPsychologistPerfilController
);
psyRouter.get(
  "",
  ensureAuth,
  validateUserActive,
  validateUserFirstLogin,
  validateUserType(psychologist),
  listPatientsController
);

psyRouter.get(
  "/patient/:id",
  ensureAuth,
  validateUserActive,
  validateUserFirstLogin,
  validateUserType(psychologist),
  listOnePatientController
);

export default psyRouter;

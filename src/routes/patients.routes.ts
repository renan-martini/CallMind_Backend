import { Router } from "express";

import createPatientController from "../controllers/patients/createPatient.controller";
import listPsychologistsController from "../controllers/patients/listPsychologists.controller";
import { validateSchemaMiddleware } from "../middlewares/validateSchema.middleware";
import { ensureAuth } from "../middlewares/validateToken.middleware";
import { validateUserType } from "../middlewares/validateUserType.middleware";
import patientSchema from "../schemas/patient.schema";
import { patient } from "../utils/utils";

const routes = Router();

const patientsRoutes = () => {
  routes.post(
    "",
    validateSchemaMiddleware(patientSchema),
    ensureAuth,
    validateUserType(patient),
    createPatientController
  );

  routes.get(
    "",
    ensureAuth,
    validateUserType(patient),
    listPsychologistsController
  );

  return routes;
};

export default patientsRoutes;

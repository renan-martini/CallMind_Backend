import { Router } from "express";
import createChartController from "../controllers/chart/createChart.controller";

import createPatientController from "../controllers/patients/createPatient.controller";
import listOnePsychologistController from "../controllers/patients/listOnePsychologist.controller";
import listPsychologistsController from "../controllers/patients/listPsychologists.controller";
import { validateUserFirstLogin } from "../middlewares/validateFirstLogin.middleware";
import { validateSchemaMiddleware } from "../middlewares/validateSchema.middleware";
import { ensureAuth } from "../middlewares/validateToken.middleware";
import { validateUserActive } from "../middlewares/validateUserActive.middleware";
import { validateUserType } from "../middlewares/validateUserType.middleware";
import { chartSchema } from "../schemas/chart.schema";
import patientSchema from "../schemas/patient.schema";
import { patient, psychologist } from "../utils/utils";
import deleteUserController from "../controllers/users/deleteUser.controller";

const routes = Router();

const patientsRoutes = () => {
  routes.post(
    "",
    validateSchemaMiddleware(patientSchema),
    ensureAuth,
    validateUserActive,
    validateUserType(patient),
    createPatientController
  );

  routes.get(
    "",
    ensureAuth,
    validateUserType(patient),
    listPsychologistsController
  );

  routes.post(
    "/:id/charts",
    validateSchemaMiddleware(chartSchema),
    ensureAuth,
    validateUserType(psychologist),
    createChartController
  );

  routes.get(
    "/psychologist/:id",
    ensureAuth,
    validateUserType(patient),
    listOnePsychologistController
  );

  return routes;
};

export default patientsRoutes;

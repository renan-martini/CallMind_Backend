import { Router } from "express";
import createChartController from "../controllers/chart/createChart.controller";

import createPatientController from "../controllers/patients/createPatient.controller";
import listPsychologistsController from "../controllers/patients/listPsychologists.controller";
import { validateSchemaMiddleware } from "../middlewares/validateSchema.middleware";
import { ensureAuth } from "../middlewares/validateToken.middleware";
import { validateUserType } from "../middlewares/validateUserType.middleware";
import { chartSchema } from "../schemas/chart.schema";
import patientSchema from "../schemas/patient.schema";
import { patient, psychologist } from "../utils/utils";

const routes = Router();

const patientsRoutes = () => {
  routes.post(
    "/",
    validateSchemaMiddleware(patientSchema),
    createPatientController
  );
  routes.get(
    "",
    ensureAuth,
    validateUserType(patient),
    listPsychologistsController
  );
  routes.post(
    '/:id/charts',
    validateSchemaMiddleware(chartSchema),
    ensureAuth,
    validateUserType(psychologist),
    createChartController
  );

  return routes;
};

export default patientsRoutes;

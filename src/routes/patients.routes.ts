import { Router } from "express";

import createPatientController from "../controllers/patients/createPatient.controller";
import { validateSchemaMiddleware } from "../middlewares/validateSchema.middleware";
import patientSchema from "../schemas/patient.schema";

const routes = Router();

const patientsRoutes = () => {
  routes.post(
    "/",
    validateSchemaMiddleware(patientSchema),
    createPatientController
  );

  return routes;
};

export default patientsRoutes;

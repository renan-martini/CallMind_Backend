import { Express } from "express";
import userRoutes from "./user.routes";
import patientsRoutes from "./patients.routes";

export const appRoutes = (app: Express) => {
  app.use("/register", userRoutes);
  app.use("/patients", patientsRoutes());
};

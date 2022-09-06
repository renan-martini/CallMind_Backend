import { Express } from "express";
import psyRouter from "./psychologist.routes";
import userRoutes from "./user.routes";
import patientsRoutes from "./patients.routes";

export const appRoutes = (app: Express) => {
  app.use("/register", userRoutes);
  app.use("/psychologists", psyRouter);
  app.use("/patients", patientsRoutes());
  app.use("/login", patientsRoutes());
};

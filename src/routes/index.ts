import { Express } from "express";
import psyRouter from "./psychologist.routes";
import userRoutes from "./user.routes";
import patientsRoutes from "./patients.routes";
import { loginRoutes } from "./login.routes";
import schedulesRouter from "./schedules.routes";

export const appRoutes = (app: Express) => {
  app.use("/user", userRoutes);
  app.use("/psychologists", psyRouter);
  app.use("/patients", patientsRoutes());
  app.use("/login", loginRoutes());
  app.use("/schedules", schedulesRouter);
};

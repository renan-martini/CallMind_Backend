import { Express } from "express";
import psyRouter from "./psychologist.routes";
import userRoutes from "./user.routes";

export const appRoutes = (app: Express) => {
  app.use("/register", userRoutes);
  app.use("/psychologists", psyRouter)
};

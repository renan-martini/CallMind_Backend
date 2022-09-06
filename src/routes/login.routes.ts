import { Router } from "express";
import { createSessionController } from "../controllers/login/session.Controllers";

export const userRoutes = Router();

userRoutes.post("", createSessionController);

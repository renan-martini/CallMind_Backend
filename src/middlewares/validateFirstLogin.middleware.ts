import { NextFunction, Request, Response, Router } from "express";
import { User } from "../entities/user.entity";
import AppDataSource from "../data-source";
import { AppError } from "../errors/appError";
import jwt from "jsonwebtoken";
import { ensureAuth } from "./validateToken.middleware";
export const validateUserFirstLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user} = req;
  if (!user || user.first_Login || !user.isActive) {
    throw new AppError(401, "Unauthorized user");
  } else {
    next();
  }
};

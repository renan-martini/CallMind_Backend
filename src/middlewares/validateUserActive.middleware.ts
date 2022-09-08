import { NextFunction, Request, Response } from "express";
import { User } from "../entities/user.entity";
import AppDataSource from "../data-source";
import { AppError } from "../errors/appError";
import jwt from "jsonwebtoken";
import { ensureAuth } from "./validateToken.middleware";
export const validateUserActive = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user } = req;

  if (!user || !user.isActive) {
    throw new AppError(401, "Invalid email or unauthorized user");
  } else {
    next();
  }
};

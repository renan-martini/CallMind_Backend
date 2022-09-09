import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/appError";

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

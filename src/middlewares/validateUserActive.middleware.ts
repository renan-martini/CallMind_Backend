import { NextFunction, Request, Response } from "express";
import { User } from "../entities/user.entity";
import AppDataSource from "../data-source";
import { AppError } from "../errors/appError";
import jwt from "jsonwebtoken";
export const validateUserActive = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization;
  if (token) {
    token = token.replace("Bearer ", "");
  } else {
    throw new AppError(401, "Missing Authorization Token");
  }

  const { email } = jwt.verify(
    token,
    process.env.SECRET_KEY ?? ""
  ) as jwt.JwtPayload;

  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: {
      email: email,
    },
  });

  if (!user || !user.isActive) {
    throw new AppError(401, "Invalid email or unauthorized user");
  } else {
    next();
  }
};

import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";

export const ensureAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token && process.env.SECRET_KEY) {
    jwt.verify(token, process.env.SECRET_KEY, async (error, decoded) => {
      if (error) {
        return res.status(401).json({ message: "Invalid token!" });
      }
      const userId = decoded?.sub;
      const userRepo = AppDataSource.getRepository(User);
      if (typeof userId === "string") {
        const user = await userRepo.findOneBy({ id: userId });
        if (user) {
          req.user = user;
          return next();
        }
      }
    });
  } else {
    return res.status(401).json({ message: "Missing authorization token!" });
  }
};

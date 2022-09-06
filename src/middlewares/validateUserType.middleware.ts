import { NextFunction, Request, Response } from "express";

export const validateUserType =
  (type: string) => (req: Request, res: Response, next: NextFunction) => {
    if (type === req.user.type) {
      next();
    } else {
      return res.status(400).json({
        message: "User type invalid!",
      });
    }
  };

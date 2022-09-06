import { Request, Response } from "express";
import { IUserLogin } from "../../interfaces/users";
import { createSessionService } from "../../services/login/createSession.service";

export const createSessionController = async (req: Request, res: Response) => {
  const { email, password }: IUserLogin = req.body;
  const token = await createSessionService({ email, password });
  return res.json({ token: token });
};

import { Request, Response } from "express";
import { IUserRequest } from "../../interfaces/users";
import createUserService from "../../services/users/createUserService.service";

const createUserController = async (req: Request, res: Response) => {
  const userData: IUserRequest = req.body;
  const newUser = await createUserService(userData);
  return res.json(newUser);
};

export default createUserController;

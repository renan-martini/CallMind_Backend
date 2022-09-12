import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import listUserService from "../../services/users/listUser.service";

const listUserController = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const userFind = await listUserService(userId);
    return res.json(instanceToPlain(userFind));
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, res);
    }
  }
};

export default listUserController;

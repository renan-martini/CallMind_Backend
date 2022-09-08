import { Request, Response } from "express";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";

const deleteUserService = async (req: Request, res: Response) => {
  const { user } = req;
  const usersRepository = AppDataSource.getRepository(User);
  if (!user) throw new AppError(404, "User not found");
  if (!user.isActive) throw new AppError(400, "User is already deleted");
  usersRepository.update(user.id, { isActive: false });
};

export { deleteUserService };

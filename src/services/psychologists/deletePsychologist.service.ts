import { Request, Response } from "express";
import AppDataSource from "../../data-source";
import { Psychologist } from "../../entities/psychologist.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";

const deletePsychologistService = async (req: Request, res: Response) => {
  const { id } = req.params;
  const usersRepository = AppDataSource.getRepository(User);
  const psychologistRepository = AppDataSource.getRepository(Psychologist);
  const psychologist: Psychologist | null =
    await psychologistRepository.findOne({
      where: { id: id },
    });
  const { user } = psychologist!;

  if (!user) throw new AppError(404, "User not found");
  if (!user.isActive) throw new AppError(400, "User is already deleted");
  usersRepository.update(user.id, { isActive: false });
};
export { deletePsychologistService };

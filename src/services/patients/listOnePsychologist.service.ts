import AppDataSource from "../../data-source";
import { Psychologist } from "../../entities/psychologist.entity";
import { AppError } from "../../errors/appError";

const listOnePsychologistService = async (id: string) => {
  try {
    const psychologistRepository = AppDataSource.getRepository(Psychologist);
    const psychologist = await psychologistRepository.findOneBy({ id });

    if (!psychologist) {
      throw new AppError(404, "Psychologist not found!");
    }

    const { user, schedules, ...rest } = psychologist;

    return rest;
  } catch (error) {
    if (error instanceof AppError) {
      throw new AppError(error.statusCode, error.message);
    } else {
      if (error instanceof Error) {
        throw new AppError(400, error.message);
      }
      throw new AppError(400, "Error");
    }
  }
};

export default listOnePsychologistService;

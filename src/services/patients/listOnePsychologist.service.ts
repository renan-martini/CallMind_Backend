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

    return psychologist;
  } catch (err) {
    throw new AppError(404, "Psychologist not found!");
  }
};

export default listOnePsychologistService;

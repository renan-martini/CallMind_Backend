import AppDataSource from "../../data-source";
import { Psychologist } from "../../entities/psychologist.entity";
import { AppError } from "../../errors/appError";

const listPsychologistsService = async () => {
  try {
    const psychologistRepository = AppDataSource.getRepository(Psychologist);
    const findPsychologists = await psychologistRepository.find();

    if (!findPsychologists) {
      throw new AppError(404, "Psychologists not found!");
    }

    const psychologists = await AppDataSource.query(
      `SELECT psychologist.* FROM psychologist`
    );
    return psychologists;
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

export default listPsychologistsService;

import AppDataSource from "../../data-source";
import { Patient } from "../../entities/patient.entity";
import { Psychologist } from "../../entities/psychologist.entity";
import { AppError } from "../../errors/appError";

const listSchedulesService = async (id: string) => {
  try {
    const psychologistsRepo = AppDataSource.getRepository(Psychologist);
    const patientsRepo = AppDataSource.getRepository(Patient);

    const user =
      (await psychologistsRepo.findOne({
        relations: { user: true },
        where: { user: { id } },
      })) ||
      (await patientsRepo.findOne({
        relations: { user: true },
        where: { user: { id } },
      }));

    if (!user) {
      throw new AppError(404, "User not found");
    }

    return user.schedules;
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

export default listSchedulesService;

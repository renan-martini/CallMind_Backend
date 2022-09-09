import AppDataSource from "../../data-source";
import { Patient } from "../../entities/patient.entity";
import { Schedule } from "../../entities/schedule.entity";
import { AppError } from "../../errors/appError";

const editSchedulesService = async (id: string, userId: string) => {
  try {
    const schedulesRepository = AppDataSource.getRepository(Schedule);
    const patientRepository = AppDataSource.getRepository(Patient);

    const schedule = await schedulesRepository.findOneBy({ id });
    if (!schedule) {
      throw new AppError(400, "Schedule not exists");
    }
    if (schedule.available == false) {
      throw new AppError(303, "Schedule currently unavailable");
    }
    const patient = await patientRepository.findOne({
      relations: { user: true },
      where: { user: { id: userId } },
    });

    await schedulesRepository.update(id, {
      patient: patient!,
      available: false,
    });
    return { message: "Successfully scheduled" };
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

export default editSchedulesService;

import AppDataSource from "../../data-source";
import { Patient } from "../../entities/patient.entity";
import { Schedule } from "../../entities/schedule.entity";
import { AppError } from "../../errors/appError";

const editSchedulesService = async (id: string, userId: string) => {
  const schedulesRepository = AppDataSource.getRepository(Schedule);
  const patientRepository = AppDataSource.getRepository(Patient);

  const schedule = await schedulesRepository.findOneBy({ id });
  if (!schedule) {
    throw new AppError(400, "Schedule not exists");
  }
  if (schedule.available === false) {
    throw new AppError(304, "Schedule currently unavailable");
  }
  const patient = await patientRepository.findOne({
    relations: { user: true },
    where: { user: { id: userId } },
  });

  await schedulesRepository.update(id, { patient: patient!, available: false });
  return { message: "Successfully scheduled" };
};

export default editSchedulesService;

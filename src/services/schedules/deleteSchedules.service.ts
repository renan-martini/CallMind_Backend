import AppDataSource from "../../data-source";
import { Psychologist } from "../../entities/psychologist.entity";
import { Schedule } from "../../entities/schedule.entity";
import { AppError } from "../../errors/appError";

const deleteSchedulesService = async (id: string, userId: string) => {
  const scheduleRepository = AppDataSource.getRepository(Schedule);
  const psychologistRepository = AppDataSource.getRepository(Psychologist);

  const psychologist = await psychologistRepository.findOne({
    relations: { user: true },
    where: { user: { id: userId } },
  });

  const schedule = await scheduleRepository.findOne({
    relations: { psychologist: true },
    where: { id: id, psychologist: { id: psychologist!.id } },
  });
  if (!schedule) {
    throw new AppError(
      400,
      "Schedule not found or psychologist does not own the schedule "
    );
  }
  await scheduleRepository.delete({ id });
  return { message: "Schedule has been deleted" };
};

export default deleteSchedulesService;

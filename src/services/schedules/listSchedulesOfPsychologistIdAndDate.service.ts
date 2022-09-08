import AppDataSource from "../../data-source";
import { Psychologist } from "../../entities/psychologist.entity";
import { AppError } from "../../errors/appError";

const listSchedulesOfPsychologistIdAndDateService = async (
  psychologistId: string,
  date: string
) => {
  if (!date || !psychologistId) {
    throw new AppError(400, "Invalid date or psychologist_id");
  }
  const schedules = await AppDataSource.getRepository(Psychologist)
    .createQueryBuilder("psychologist")
    .innerJoinAndSelect("psychologist.schedules", "schedules")
    .select(["schedules.*"])
    .where("psychologist.id = :id , schedules.date = :date", {
      id: psychologistId,
      date: date,
    })
    .getMany();
  if (!schedules) {
    throw new AppError(404, "Don't have available schedules in this day");
  }
  return schedules;
};

export default listSchedulesOfPsychologistIdAndDateService;

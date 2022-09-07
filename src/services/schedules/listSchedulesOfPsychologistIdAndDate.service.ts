import AppDataSource from "../../data-source";
import { Psychologist } from "../../entities/psychologist.entity";
import { AppError } from "../../errors/appError";

const listSchedulesOfPsychologistIdAndDateService = async (
  psychologisId: string,
  date: string
) => {
  if (!date) {
    throw new AppError(400, "Date was not informed");
  }
  const schedules = await AppDataSource.getRepository(Psychologist)
    .createQueryBuilder("psychologist")
    .innerJoinAndSelect("psychologist.schedules", "schedules")
    .select(["schedules.*"])
    .where("psychologist.id = :id , schedules.date = :date", {
      id: psychologisId,
      date: date,
    })
    .getMany();
  if (!schedules) {
    throw new AppError(404, "Don't have available schedules in this day");
  }
  return schedules;
};

export default listSchedulesOfPsychologistIdAndDateService;

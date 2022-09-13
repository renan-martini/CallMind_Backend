import AppDataSource from "../../data-source";
import { Psychologist } from "../../entities/psychologist.entity";
import { Schedule } from "../../entities/schedule.entity";

const createSchedulesService = async (data: any, userId: string) => {
  const scheduleRepository = AppDataSource.getRepository(Schedule);
  const psychologistRepository = AppDataSource.getRepository(Psychologist);
  const psychologists = await psychologistRepository.findOne({
    relations: { user: true },
    where: { user: { id: userId } },
  });
  const newSchedule: any = scheduleRepository.create({
    ...data,
    psychologist: psychologists,
    link: psychologists!.meeting,
  });
  await scheduleRepository.save(newSchedule);

  const { psychologist, ...rest } = newSchedule;

  return rest;
};

export default createSchedulesService;

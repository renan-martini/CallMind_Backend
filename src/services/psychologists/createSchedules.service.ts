import AppDataSource from "../../data-source";
import { Psychologist } from "../../entities/psychologist.entity";
import { Schedule } from "../../entities/schedule.entity";

const createSchedulesService = async (data: any, userId: string) => {
  const scheduleRepository = AppDataSource.getRepository(Schedule);
  const psychologistRepository = AppDataSource.getRepository(Psychologist);
  const psychologist = await psychologistRepository.findOne({
    relations: { user: true },
    where: { user: { id: userId } },
  });
  const newSchedule = scheduleRepository.create({
    ...data,
    psychologist: psychologist,
  });
  await scheduleRepository.save(newSchedule);

  return newSchedule;
};

export default createSchedulesService;

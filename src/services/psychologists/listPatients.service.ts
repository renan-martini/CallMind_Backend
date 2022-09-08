import AppDataSource from "../../data-source";
import { Psychologist } from "../../entities/psychologist.entity";

import { Schedule } from "../../entities/schedule.entity";

const listPatientsService = async (id: string) => {
  const psychologistRepository = AppDataSource.getRepository(Psychologist);
  const psychologist = await psychologistRepository.findOne({
    relations: { user: true },
    where: { user: { id: id } },
  });
  const patients = await AppDataSource.getRepository(Schedule)
    .createQueryBuilder("schedules")
    .innerJoinAndSelect("schedules.patient", "patient")
    .innerJoinAndSelect("schedules.psychologist", "psychologist")
    .select(["patient.*"])
    .where("psychologist.id = :id, schedules.available = false", {
      id: psychologist!.id,
    })
    .getMany();
  return patients;
};

export default listPatientsService;

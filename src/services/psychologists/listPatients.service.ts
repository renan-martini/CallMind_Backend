import AppDataSource from "../../data-source";

import { Schedule } from "../../entities/schedule.entity";

const listPatientsService = async (id: string) => {
  const patients = await AppDataSource.getRepository(Schedule)
    .createQueryBuilder("schedules")
    .innerJoinAndSelect("schedules.patient", "patient")
    .innerJoinAndSelect("schedules.psychologist", "psychologist")
    .select(["patient.*"])
    .where("psychologist.id = :id", { id })
    .getMany();
  return patients;
};

export default listPatientsService;

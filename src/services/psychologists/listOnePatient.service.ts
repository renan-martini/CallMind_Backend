import AppDataSource from "../../data-source";

import { Schedule } from "../../entities/schedule.entity";

const listOnePatientsService = async (id: string, patientId: any) => {
  const patient = await AppDataSource.getRepository(Schedule)
    .createQueryBuilder("schedules")
    .innerJoinAndSelect("schedules.patient", "patient")
    .innerJoinAndSelect("schedules.psychologist", "psychologist")
    .select(["patient.*"])
    .where("psychologist.id = :id", { id })
    .andWhere("patient.id = :id", { patientId })
    .getOne();
  return patient;
};

export default listOnePatientsService;

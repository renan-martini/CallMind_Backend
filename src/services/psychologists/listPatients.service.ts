import AppDataSource from "../../data-source";
import { Psychologist } from "../../entities/psychologist.entity";

import { Schedule } from "../../entities/schedule.entity";

const listPatientsService = async (id: string) => {
  const psychologistRepository = AppDataSource.getRepository(Psychologist);
  const psychologist = await psychologistRepository.findOne({
    relations: { user: true },
    where: { user: { id: id } },
  });

  const patients = await AppDataSource.query(
    `SELECT patient.* FROM schedules
  JOIN patient ON patient.id = schedules."patientId"
  JOIN psychologist ON psychologist.id = schedules."psychologistId"
  WHERE psychologist.id = $1 AND schedules.available = false
  GROUP BY patient.id;`,
    [psychologist!.id]
  );
  return patients;
};

export default listPatientsService;

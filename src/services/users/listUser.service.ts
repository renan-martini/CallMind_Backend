import AppDataSource from "../../data-source";
import { Patient } from "../../entities/patient.entity";
import { Psychologist } from "../../entities/psychologist.entity";
import { User } from "../../entities/user.entity";
import { patient, psychologist } from "../../utils/utils";

const listUserService = async (userId: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ id: userId });

  if (user?.type === patient) {
    const patientsRepository = AppDataSource.getRepository(Patient);
    const patient = await patientsRepository.findOne({
      relations: { user: true },
      where: { user: { id: userId } },
    });

    return patient;
  }
  if (user?.type === psychologist) {
    const psychologistsRepository = AppDataSource.getRepository(Psychologist);
    const psychologist = await psychologistsRepository.findOne({
      relations: { user: true },
      where: { user: { id: userId } },
    });
    return psychologist;
  }
};

export default listUserService;

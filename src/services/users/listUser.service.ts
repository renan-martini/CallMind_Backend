import AppDataSource from "../../data-source";
import { Patient } from "../../entities/patient.entity";
import { Psychologist } from "../../entities/psychologist.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import { patient, psychologist } from "../../utils/utils";

const listUserService = async (userId: string) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ id: userId });

    if (!user) {
      throw new AppError(404, "User not found!");
    }

    if (user.first_Login === true) {
      return user;
    }

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
  } catch (error) {
    if (error instanceof AppError) {
      throw new AppError(error.statusCode, error.message);
    } else {
      if (error instanceof Error) {
        throw new AppError(400, error.message);
      }
      throw new AppError(400, "Error");
    }
  }
};

export default listUserService;

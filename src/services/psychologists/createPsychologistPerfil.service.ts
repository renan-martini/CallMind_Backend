import AppDataSource from "../../data-source";
import { Psychologist } from "../../entities/psychologist.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import {
  IUserPsychologistRequest,
  IUserPsychologistResponse,
} from "../../interfaces/psychologists";

const createPsychologistPerfilService = async ({
  name,
  img,
  emphasis,
  experience,
  available_times,
  working_days,
  registration,
  userId,
}: IUserPsychologistRequest): Promise<IUserPsychologistResponse> => {
  const psychologistRepository = AppDataSource.getRepository(Psychologist);
  const userRepository = AppDataSource.getRepository(User);

  const userPsyAlreadyExists = await userRepository.findOneBy({ id: userId });
  if (!userPsyAlreadyExists) {
    throw new AppError(400, "User not found!");
  }

  const psychologistAlreadyExist = await psychologistRepository.find({
    where: {
      name,
      img,
      emphasis,
      experience,
      available_times,
      registration,
    },
  });

  if (psychologistAlreadyExist.length > 0) {
    throw new AppError(400, "This psychologist already exists");
  }

  const userPsy = await userRepository.findOneBy({ id: userId });

  const psychologist = new Psychologist();
  psychologist.name = name;
  psychologist.img = img;
  psychologist.emphasis = emphasis;
  psychologist.experience = experience;
  psychologist.available_times = available_times;
  psychologist.working_days = working_days;
  psychologist.registration = registration;
  psychologist.user = userPsy!;

  psychologistRepository.create(psychologist);

  await psychologistRepository.save(psychologist);

  await userRepository.update(userId, { first_Login: false });

  return psychologist;
};

export default createPsychologistPerfilService;

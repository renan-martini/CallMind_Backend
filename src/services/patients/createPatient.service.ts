import AppDataSource from "../../data-source";
import { AppError } from "../../errors/appError";
import { Patient } from "../../entities/patient.entity";
import { IPatientRequest } from "../../interfaces/patients";
import { User } from "../../entities/user.entity";

const createPatientService = async ({
  userId,
  name,
  img,
  age,
  status,
  schooling,
  profession,
  complaint,
  medication,
  disease,
}: IPatientRequest) => {
  const patientRepository = AppDataSource.getRepository(Patient);
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ id: userId });
  if (!user) {
    throw new AppError(404, "User not found!");
  }

  const patientsAlreadyExist = await patientRepository.find({
    where: {
      name,
      img,
      age,
      status,
      schooling,
      profession,
      complaint,
      medication,
      disease,
    },
  });

  if (patientsAlreadyExist.length > 0) {
    throw new AppError(400, "This patient already exists");
  }

  const newPatient = patientRepository.create({
    user,
    name,
    img,
    age,
    status,
    schooling,
    profession,
    complaint,
    medication,
    disease,
  });

  await patientRepository.save(newPatient);

  await userRepository.update(userId!, { first_Login: false });

  return newPatient;
};

export default createPatientService;

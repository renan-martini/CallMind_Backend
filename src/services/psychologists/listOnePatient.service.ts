import AppDataSource from "../../data-source";
import { Patient } from "../../entities/patient.entity";
import { AppError } from "../../errors/appError";

const listOnePatientService = async (id: string) => {
  try {
    const patientRepository = AppDataSource.getRepository(Patient);
    const patient = await patientRepository.findOneBy({ id });
    console.log("Encontrado no Service", patient);

    if (!patient) {
      throw new AppError(404, "Patient not found!");
    }

    const { user, ...rest } = patient;

    return rest;
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

export default listOnePatientService;

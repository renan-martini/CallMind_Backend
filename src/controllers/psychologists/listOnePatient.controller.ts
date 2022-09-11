import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import listOnePatientService from "../../services/psychologists/listOnePatient.service";

const listOnePatientController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const patient = await listOnePatientService(id);

    return res.json(instanceToPlain(patient));
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default listOnePatientController;

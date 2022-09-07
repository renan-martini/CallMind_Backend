import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import listOnePatientsService from "../../services/psychologists/listOnePatient.service";

const listOnePatientsController = async (req: Request, res: Response) => {
  const psychologistId = req.user.id;
  const patientId = req.params;

  const patient = await listOnePatientsService(psychologistId, patientId);

  return res.json(instanceToPlain(patient));
};

export default listOnePatientsController;

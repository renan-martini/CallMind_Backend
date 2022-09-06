import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import listPatientsService from "../../services/psychologists/listPatients.service";

const listPatientsController = async (req: Request, res: Response) => {
  const psychologistId = req.user.id;
  const patients = await listPatientsService(psychologistId);

  return res.json(instanceToPlain(patients));
};

export default listPatientsController;

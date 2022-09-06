import { Request, Response } from "express";
import listPsychologistsService from "../../services/patients/listPsychologists.service";

const listPsychologistsController = async (req: Request, res: Response) => {
  const psychologists = await listPsychologistsService();
  return res.json(psychologists);
};

export default listPsychologistsController;

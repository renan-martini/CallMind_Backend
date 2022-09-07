import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import { AppError, handleError } from "../../errors/appError";
import listOnePsychologistService from "../../services/patients/listOnePsychologist.service";

const listOnePsychologistController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const psychologist = await listOnePsychologistService(id);

    return res.json(instanceToPlain(psychologist));
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default listOnePsychologistController;

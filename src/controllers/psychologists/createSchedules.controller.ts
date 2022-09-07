import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import createSchedulesService from "../../services/psychologists/createSchedules.service";

const createSchedulesController = async (req: Request, res: Response) => {
  const data = req.body;
  const userId = req.user.id;
  const schedule = await createSchedulesService(data, userId);
  return res.status(201).json(instanceToPlain(schedule));
};

export default createSchedulesController;

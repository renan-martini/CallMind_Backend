import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import createSchedulesService from "../../services/schedules/createSchedules.service";

const createSchedulesController = async (req: Request, res: Response) => {
  const data = req.body;
  console.log("data", data);

  const userId = req.user.id;
  const schedule = await createSchedulesService(data, userId);
  return res.status(201).json(instanceToPlain(schedule));
};

export default createSchedulesController;

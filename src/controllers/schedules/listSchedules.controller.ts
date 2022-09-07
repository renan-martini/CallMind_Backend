import { NextFunction, Request, Response } from "express";
import listSchedulesService from "../../services/schedules/listSchedules.service";

const listSchedulesController = (req: Request, res: Response) => {
  const { id } = req.user;
  const schedules = listSchedulesService(id);
  return res.status(200).json(schedules);
};

export default listSchedulesController;

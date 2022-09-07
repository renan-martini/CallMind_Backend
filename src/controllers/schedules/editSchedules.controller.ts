import { Request, Response } from "express";
import editSchedulesService from "../../services/schedules/editSchedules.service";

const editScheduleController = async (req: Request, res: Response) => {
  const userId = req.user.id;
  const scheduleId = req.params.id;
  const updatedScheduleMessage = await editSchedulesService(scheduleId, userId);
  res.status(202).json(updatedScheduleMessage);
};

export default editScheduleController;

import { Request, Response } from "express";
import deleteSchedulesService from "../../services/schedules/deleteSchedules.service";

const deleteSchedulesController = async (req: Request, res: Response) => {
  const id = req.params.id;
  const userId = req.user.id;
  const responseMessage = await deleteSchedulesService(id, userId);
  return res.status(202).json(responseMessage);
};

export default deleteSchedulesController;

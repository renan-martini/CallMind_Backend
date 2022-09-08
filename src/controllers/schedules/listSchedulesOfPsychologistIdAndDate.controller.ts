import { Request, Response } from "express";
import listSchedulesOfPsychologistIdAndDateService from "../../services/schedules/listSchedulesOfPsychologistIdAndDate.service";

const listSchedulesOfPsychologistIdAndDateController = async (
  req: Request,
  res: Response
) => {
  const psychologistId = req.params.psychologist_id;
  const date = req.params.date;
  const schedules = await listSchedulesOfPsychologistIdAndDateService(
    psychologistId,
    date
  );
  res.json(schedules);
};

export default listSchedulesOfPsychologistIdAndDateController;

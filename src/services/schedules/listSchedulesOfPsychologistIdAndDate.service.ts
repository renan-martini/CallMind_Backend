import AppDataSource from "../../data-source";
import { AppError } from "../../errors/appError";

const listSchedulesOfPsychologistIdAndDateService = async (
  psychologistId: string,
  date: string
) => {
  if (!date || !psychologistId) {
    throw new AppError(400, "Invalid date or psychologist_id");
  }
  const schedules = await AppDataSource.query(
    `
  SELECT schedules.* FROM schedules
  WHERE schedules."psychologistId" = $1 AND schedules.date = $2 AND schedules.available = true
  `,
    [psychologistId, date]
  );
  if (schedules.length === 0) {
    throw new AppError(404, "Don't have available schedules in this day");
  }
  return schedules;
};

export default listSchedulesOfPsychologistIdAndDateService;

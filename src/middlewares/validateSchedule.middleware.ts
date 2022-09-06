import { NextFunction, Request, Response } from "express";
import AppDataSource from "../data-source";
import { Schedule } from "../entities/schedule.entity";

export const validateSchedule = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schedulesRepo = AppDataSource.getRepository(Schedule);
  const { date, hour } = req.body;
  const { id } = req.user;

  const repeated = await schedulesRepo.findOne({
    relations: { psychologist: true },
    where: { date, hour, psychologist: { id } },
  });
  if (repeated) {
    return res.status(400).json({
      message: "Date/Time already created!",
    });
  }
  next();
};

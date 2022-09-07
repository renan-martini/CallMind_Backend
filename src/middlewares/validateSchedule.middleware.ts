import { NextFunction, Request, Response } from "express";
import AppDataSource from "../data-source";
import { Psychologist } from "../entities/psychologist.entity";
import { Schedule } from "../entities/schedule.entity";

export const validateSchedule = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schedulesRepo = AppDataSource.getRepository(Schedule);
  const PsychologistRepo = AppDataSource.getRepository(Psychologist);

  const { date, hour } = req.body;
  const userId = req.user.id;

  const psychologist = await PsychologistRepo.findOne({
    relations: { user: true },
    where: { user: { id: userId } },
  });

  const repeated = await schedulesRepo.findOne({
    relations: { psychologist: true },
    where: { date, hour, psychologist: { id: psychologist!.id } },
  });
  if (repeated) {
    return res.status(400).json({
      message: "Date/Time already created!",
    });
  }
  next();
};

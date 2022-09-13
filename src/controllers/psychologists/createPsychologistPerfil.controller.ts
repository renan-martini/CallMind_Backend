import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import createPsychologistPerfilService from "../../services/psychologists/createPsychologistPerfil.service";

const createPsychologistPerfilController = async (
  request: Request,
  response: Response
) => {
  try {
    const userId = request.user.id;
    const {
      name,
      img,
      emphasis,
      experience,
      available_times,
      working_days,
      registration,
      meeting,
    } = request.body;

    const userPsy = await createPsychologistPerfilService({
      name,
      img,
      emphasis,
      experience,
      available_times,
      working_days,
      registration,
      userId,
      meeting,
    });

    return response.status(201).json(instanceToPlain(userPsy));
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, response);
    }
  }
};

export default createPsychologistPerfilController;

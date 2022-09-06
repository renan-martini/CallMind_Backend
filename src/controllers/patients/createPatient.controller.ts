import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import createPatientService from "../../services/patients/createPatient.service";

const createPatientController = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;
    const userId = id;
    const {
      name,
      img,
      age,
      status,
      schooling,
      profession,
      complaint,
      medication,
      disease,
    } = req.body;

    const newPatient = await createPatientService({
      userId,
      name,
      img,
      age,
      status,
      schooling,
      profession,
      complaint,
      medication,
      disease,
    });

    return res.status(201).json({ message: "Patiente Created!" });
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default createPatientController;

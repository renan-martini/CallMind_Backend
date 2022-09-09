import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import createChartService from "../../services/chart/createChart.service";

const createChartController = async (request: Request, response: Response) => {
  try {
    const patientId = request.params.id;
    const psychologistId = request.psychologist.id;
    const { date, description } = request.body;

    const chart = await createChartService(
      { date, description },
      patientId,
      psychologistId
    );

    return response.status(201).json({
      message: "Record created successfully",
    });
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, response);
    }
  }
};

export default createChartController;

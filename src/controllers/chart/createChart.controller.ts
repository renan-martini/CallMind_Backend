import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import createChartService from "../../services/chart/createChart.service";

const createChartController = async (request: Request, response: Response) => {
  try {
    const patientId = request.params.id;
    const psychologistId = request.user.id;
    const { date, description } = request.body;

    const chart = await createChartService(
      { date, description },
      patientId,
      psychologistId
    );

    return response.json(chart);
  } catch (error) {
    if (error instanceof AppError) {
      handleError(error, response);
    }
  }
};

export default createChartController;

import { Request, Response } from "express"
import { AppError, handleError } from "../../errors/appError"
import listChartService from "../../services/chart/listChart.service"

const listChartController = async (request:Request, response:Response) => {
    try {
        const patientId = request.params.id

        const records = await listChartService(patientId)

        return response.json(records)

    } catch (error) {
        if(error instanceof AppError){
            handleError(error,response)
        }
    }
}

export default listChartController
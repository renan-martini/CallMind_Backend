import AppDataSource from "../../data-source";
import { Chart } from "../../entities/chart.entity";
import { Patient } from "../../entities/patient.entity";
import { Psychologist } from "../../entities/psychologist.entity";
import { AppError } from "../../errors/appError";
import { IChart } from "../../interfaces/chart";

const createChartService = async ({date,description}:IChart, patientId:string, psychologistId:string) => {
    const chartRepository = AppDataSource.getRepository(Chart)
    const psyRepository = AppDataSource.getRepository(Psychologist)
    const patientRepository = AppDataSource.getRepository(Patient)

    const psy = await psyRepository.findOneBy({id: psychologistId})

    const patient = await patientRepository.findOneBy({id:patientId})

    if(!!psy && !!patient){

        const chart = new Chart()
        chart.date = date
        chart.description = description
        chart.patient = patient
        chart.psychologist = psy


        chartRepository.create(chart)
        await chartRepository.save(chart)

        return chart
    }else{
        throw new AppError(400, "Creation of chart unauthorized")
    }
}

export default createChartService

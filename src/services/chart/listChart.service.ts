import AppDataSource from "../../data-source"
import { Patient } from "../../entities/patient.entity"
import { AppError } from "../../errors/appError"

const listChartService = async (patientId:string) => {
    const patientRepository = AppDataSource.getRepository(Patient)

    const patient = await patientRepository.findOneBy({id: patientId})
    if(!patient){
        throw new AppError(401, "Patient not exists")
    }

    const chart = await patientRepository.findOneBy({id: patientId}).then(resp => resp?.chart)

    return chart
}

export default listChartService
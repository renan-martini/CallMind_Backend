import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import createPsychologistPerfilService from "../../services/users/createPsychologistPerfil.service";

const createPsychologistPerfilController = async (request:Request, response:Response) => {
    try {
        const userId = request.user.id
        const {
            name,
            img,
            emphasis,
            experience,
            available_times,
            working_days,
            registration  

        } = request.body

        const userPsy = await createPsychologistPerfilService({
            name,
            img,
            emphasis,
            experience,
            available_times,
            working_days,
            registration,
            userId        
        })

    } catch (error) {
        if(error instanceof AppError){
            handleError(error,response)
        }
    }
}

export default createPsychologistPerfilController
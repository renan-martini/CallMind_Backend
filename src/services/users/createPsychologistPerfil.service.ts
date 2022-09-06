import AppDataSource from "../../data-source";
import { Psychologist } from "../../entities/psychologist.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import { IUserPsychologistRequest, IUserPsychologistResponse } from "../../interfaces/users";

const createPsychologistPerfilService = async ({
    name,
    img,
    emphasis,
    experience,
    available_times,
    working_days,
    registration,
    userId,

}:IUserPsychologistRequest): Promise<IUserPsychologistResponse> => {
    const psychologistRepository = AppDataSource.getRepository(Psychologist)
    const userRepository = AppDataSource.getRepository(User)

    const userPsyAlreadyExists = await userRepository.findOneBy({id:userId})
    if(!!userPsyAlreadyExists){
        throw new AppError(400, "User already exists")
    }

    await userRepository.update(userId, {first_Login: false})

    const userPsy = await userRepository.findOneBy({id:userId})
    
    const psychologist = new Psychologist()
    psychologist.name = name
    psychologist.img = img
    psychologist.emphasis = emphasis
    psychologist.experience = experience
    psychologist.available_times = available_times
    psychologist.working_days = working_days
    psychologist.registration = registration
    psychologist.user = userPsy !

    psychologistRepository.create(psychologist)
    await psychologistRepository.save(psychologist)

    return psychologist
}

export default createPsychologistPerfilService
import AppDataSource from "../../data-source";
import { Psychologist } from "../../entities/psychologist.entity";

const listPsychologistsService = async () => {

  const psychologistRepository = AppDataSource.getRepository(Psychologist);
  const psychologists = await psychologistRepository.find();
  return psychologists;
  
};

export default listPsychologistsService;

import AppDataSource from "../../data-source";

const listPsychologistsService = async () => {
  const psychologists = await AppDataSource.query(
    `SELECT psychologist.* FROM psychologist`
  );
  return psychologists;
};

export default listPsychologistsService;

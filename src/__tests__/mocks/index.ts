import { IUserRequest, IUserLogin } from "../../interfaces/users";
import { IPatientRequest } from "../../interfaces/patients";
import { IUserPsychologistRequest } from "../../interfaces/psychologists";
import { IScheduleCreateRequest } from "../../interfaces/schedules";
import { IChart } from "../../interfaces/chart";
import { patient, psychologist } from "../../utils/utils";

export const mockedUserPsycho: IUserRequest = {
  email: "elvis@email.com",
  password: "Bolinha10*",
  userName: "Presley",
  type: psychologist,
};

export const mockedUserPsychoLogin: IUserLogin = {
  email: "elvis@email.com",
  password: "Bolinha10*",
};

export const mockedUserDelete: IUserRequest = {
  email: "michael@email.com",
  password: "Bolinha10*",
  userName: "Jackson",
  type: psychologist,
};

export const mockedUserDeleteLogin: IUserLogin = {
  email: "michael@email.com",
  password: "Bolinha10*",
};

export const mockedPsycho: IUserPsychologistRequest = {
  name: "Elvis Presley",
  img: "https://www.estrelando.com.br/nota/2019/08/01/elvis-presley-queria-se-casar-com-namorada-aos-13-anos-de-idade-diz-site-240163",
  emphasis: "Psicologia da Cognição e Personalidade",
  experience: "15 anos",
  available_times: "8:00 - 22:00",
  working_days: ["Wed", "Thu", "Fri"],
  registration: "RK0101",
  meeting: "https://callmindbr.salareuniao85749678965874",
};

export const mockedUserPatient: IUserRequest = {
  email: "elvis2@email.com",
  password: "Bolinha10*",
  userName: "Presley",
  type: patient,
};

export const mockedUserPatientLogin: IUserLogin = {
  email: "elvis2@email.com",
  password: "Bolinha10*",
};

export const mockedPatient: IPatientRequest = {
  name: "Susimara Roberti",
  img: "https://www.petz.com.br/blog/dicas/cat-sitter/",
  age: 33,
  status: "Casado",
  schooling: "Ensino Superior Completo",
  profession: "Desenvolvedor",
  complaint: "Sentimento de abandono",
  medication: "Na",
  disease: "Na",
};

export const mockedSchedule: IScheduleCreateRequest = {
  date: "2022/09/15",
  hour: "10:00",
};

export const mockedChart: IChart = {
  date: "2022/09/15",
  description:
    "paciente relata sofrer muito com sua imagem em relação as outras pessoas, apresenta crenças muito negativas sobre si e sobre as pessoas a sua volta. Será necessário abordagem do histórico de suas relações na infância e escolar",
};

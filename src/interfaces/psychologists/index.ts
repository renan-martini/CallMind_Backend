import { User } from "../../entities/user.entity";

export interface IUserPsychologistRequest {
  name: string;
  img: string;
  emphasis: string;
  experience: string;
  available_times: string;
  working_days: string[];
  registration: string;
  userId?: string;
  meeting: string;
}

export interface IUserPsychologistResponse {
  id: string;
  name: string;
  img: string;
  emphasis: string;
  experience: string;
  available_times: string;
  working_days: string[];
  registration: string;
  user: User;
  meeting: string;
}

import { User } from "../../entities/user.entity";

export interface IUserRequest {
  email: string;
  password: string;
  userName: string;
  first_login: string;
  type: string;
}

export interface IUser extends IUserRequest {
  id: string;
  isActive: boolean;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserPsychologistRequest {  
  name: string
  img: string
  emphasis: string
  experience: string
  available_times: string
  working_days: string[]
  registration: string 
  userId: string 
}

export interface IUserPsychologistResponse {
  id: string
  name: string
  img: string
  emphasis: string
  experience: string
  available_times: string
  working_days: string[]
  registration: string
  user: User    
}

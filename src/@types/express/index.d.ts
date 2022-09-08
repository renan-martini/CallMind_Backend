import * as express from "express";
import { User } from "../../entities/user.entity";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        type: string;
        userName: string;
        first_Login: boolean;
        isActive: boolean;
      };
      patient: {
        id: string;
        name: string;
        img: string;
        age: number;
        status: string;
        schooling: string;
        profession: string;
        complaint: string;
        medication: string;
        disease: string;
        user: User;
      };
      psychologist: {
        id: string;
        user: User;
        name: string;
        img: string;
        emphasis: string;
        experience: string;
        available_times: string;
        working_days: string[];
        registration: string;
      };
    }
  }
}

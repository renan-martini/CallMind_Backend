import { appendFile } from "fs";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import * as jwt from "jsonwebtoken";
import "dotenv/config";

const validateEmailService = async (token: string) => {
  if (token && process.env.SECRET_KEY) {
    jwt.verify(token, process.env.SECRET_KEY, async (error, decoded) => {
      if (error) {
        throw new AppError(401, "Invalid token!");
      }
      const userId = decoded?.sub;
      const userRepo = AppDataSource.getRepository(User);
      if (typeof userId === "string") {
        const user = await userRepo.findOneBy({ id: userId });
        await userRepo.update({ id: user?.id }, { isActive: true });
      }
    });
  } else {
    throw new AppError(401, "Missing authorization token!");
  }
};

export default validateEmailService;

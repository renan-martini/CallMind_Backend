import { IUserLogin } from "../../interfaces/users";
import { compare } from "bcryptjs";
import "dotenv/config";
import * as jwt from "jsonwebtoken";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";

export const createSessionService = async ({ email, password }: IUserLogin) => {
  const userRepository = AppDataSource.getRepository(User);

  let user = await userRepository.findOne({
    where: {
      email: email,
    },
  });
  if (!user) {
    user = await userRepository.findOne({
      where: {
        userName: email,
      },
    });
  }

  if (!user || !user.isActive) {
    throw new AppError(403, "Invalid email or password, or unauthorized user");
  }

  const matchPassword = await compare(password, user.password);

  if (!matchPassword) {
    throw new AppError(401, "Invalid email or password");
  }

  const token = jwt.sign(
    { email: user.email, id: user.id, type: user.type },
    process.env.SECRET_KEY as string,
    {
      subject: user.id,
      expiresIn: "8h",
    }
  );

  return { token, user };
};

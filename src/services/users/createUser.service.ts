import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import { IUserRequest } from "../../interfaces/users";
import { createValidationEmail } from "../../utils/createValidationEmail.utils";
import { sendEmail } from "../../utils/utils";
import * as jwt from "jsonwebtoken";

const createUserService = async (userData: IUserRequest) => {
  const userRepository = AppDataSource.getRepository(User);

  const userAlreadyExists = await userRepository.findOneBy({
    email: userData.email,
  });

  if (userAlreadyExists) {
    throw new AppError(400, "User already exists");
  }

  const newUser = userRepository.create({ ...userData });
  await userRepository.save(newUser);

  const token = jwt.sign(
    { email: newUser.email, id: newUser.id, type: newUser.type },
    process.env.SECRET_KEY as string,
    {
      subject: newUser.id,
      expiresIn: "1h",
    }
  );

  await sendEmail({
    subject: `${newUser.userName} validate email`,
    text: createValidationEmail(newUser.email, token),
    to: newUser.email,
  });
  return newUser;
};

export default createUserService;

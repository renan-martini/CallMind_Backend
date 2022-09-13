import { Request, Response } from "express";
import validateEmailService from "../../services/users/validateEmail.service";

const validateEmailController = async (req: Request, res: Response) => {
  const { token } = req.params;
  await validateEmailService(token);
  return res.status(200).json({ message: "Validated account!" });
};

export default validateEmailController;

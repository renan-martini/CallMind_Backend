import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";

import { deleteUserService } from "../../services/users/deleteUser.service";

const deleteUserController = async (req: Request, res: Response) => {
  try {
    await deleteUserService(req, res);
    return res.status(204).json({
      message: "Usuário deletado com sucesso",
    });
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default deleteUserController;

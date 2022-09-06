import { Router } from "express"
import createPsychologistPerfilController from "../controllers/users/createPsychologistPerfil.controller"
import { validateSchemaMiddleware } from "../middlewares/validateSchema.middleware"
import { ensureAuth } from "../middlewares/validateToken.middleware"
import { validateUserType } from "../middlewares/validateUserType.middleware"
import psychologistSchema from "../schemas/psychologist.schema"

const psyRouter = Router()

psyRouter.post("", validateSchemaMiddleware(psychologistSchema), ensureAuth, validateUserType, createPsychologistPerfilController)

export default psyRouter
import * as yup from "yup";
import { hashSync } from "bcrypt";

const userSchema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup
    .string()
    .required()
    .transform((value, originalValue) => hashSync(originalValue, 10)),
  userName: yup.string().required(),
  type: yup.string().oneOf(["Patient", "Psychologist"]),
});

export default userSchema;

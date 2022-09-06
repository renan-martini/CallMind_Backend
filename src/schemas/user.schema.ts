import * as yup from "yup";
import { hashSync } from "bcryptjs";
import { patient, psychologist } from "../utils/utils";

const userSchema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup
    .string()
    .required()
    .transform((value, originalValue) => hashSync(originalValue, 10)),
  userName: yup.string().required(),
  type: yup.string().oneOf([patient, psychologist]),
});

export default userSchema;

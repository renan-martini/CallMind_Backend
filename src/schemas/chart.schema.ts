import * as yup from "yup";

export const chartSchema = yup.object().shape({
  date: yup.string().required(),
  description: yup.string().required(),
});
import * as yup from "yup";

const psychologistSchema = yup.object().shape({
  name: yup.string().required(),
  img: yup.string().required(),
  emphasis: yup.string().required(),
  experience: yup.string().required(),
  available_times: yup.string().required(),
  working_days: yup.array().required(),
  registration: yup.string().required(),
});

export default psychologistSchema;
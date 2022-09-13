import * as yup from "yup";

const psychologistSchema = yup.object().shape({
  name: yup
    .string()
    .required("Mandatory first and last name")
    .matches(
      /^[A-ZÀ-Ÿ][A-zÀ-ÿ']+\s([A-zÀ-ÿ']\s?)*[A-ZÀ-Ÿ][A-zÀ-ÿ']+$/,
      "First letter of each name capitalized, " +
        "no double spaces, " +
        "and without numbers."
    ),
  img: yup.string().required("Enter your profile picture url."),
  emphasis: yup
    .string()
    .min(10, "Minimum 10 characters")
    .required("Required field!"),
  experience: yup
    .string()
    .min(5, "Minimum 5 characters")
    .required("Required field!"),
  available_times: yup.string().required(),
  working_days: yup.array().required(),
  registration: yup
    .string()
    .min(6, "Minimum 6 characters")
    .required("Required field!"),
  meeting: yup.string().required("Required field!"),
});

export default psychologistSchema;

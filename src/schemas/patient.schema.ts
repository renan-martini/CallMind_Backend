import * as yup from "yup";

const patientSchema = yup.object().shape({
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
  age: yup
    .number()
    .typeError("Only numbers")
    .required()
    .positive("Only positive numbers")
    .integer("Only whole numbers"),
  status: yup.string().required(),
  schooling: yup.string().required(),
  profession: yup
    .string()
    .min(5, "Minimum 5 characters")
    .required("Required field!"),
  complaint: yup
    .string()
    .required("Required field!")
    .min(10, "Minimum 10 characters"),
  medication: yup.string(),
  disease: yup.string(),
});

export default patientSchema;

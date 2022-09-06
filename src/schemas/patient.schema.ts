import * as yup from "yup";

const patientSchema = yup.object().shape({
  name: yup
    .string()
    .required("Nome e Sobrenome obrigatórios")
    .matches(
      /^[A-ZÀ-Ÿ][A-zÀ-ÿ']+\s([A-zÀ-ÿ']\s?)*[A-ZÀ-Ÿ][A-zÀ-ÿ']+$/,
      "Primeira letra de cada nome maiúscula, " +
        "sem espaços duplos " +
        "e sem números"
    ),
  img: yup.string().required("Insira a url da sua foto de perfil"),
  age: yup
    .number()
    .typeError("Apenas números")
    .required()
    .positive("Apenas números positivos")
    .integer("Apenas números inteiros"),
  status: yup.string().required(),
  schooling: yup.string().required(),
  profession: yup
    .string()
    .min(5, "Mínimo 5 caracteres")
    .required("Campo obrigatório!"),
  complaint: yup
    .string()
    .required("Campo obrigatório!")
    .min(10, "Mínimo 10 caracteres"),
  medication: yup.string(),
  disease: yup.string(),
});

export default patientSchema;

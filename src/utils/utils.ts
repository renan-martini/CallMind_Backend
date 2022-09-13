import "dotenv/config";
import { AppError } from "../errors/appError";
import { IEmailRequest } from "../interfaces/email/email.interface";

export const patient = "Paciente";
export const psychologist = "Psicólogo";

const nodemailer = require("nodemailer");

//Fazendo a conexão com o nosso servidor de SMPT
//Para a conexão funcionar, precisamos puxar o usuário e senha do outlook que foram colocados no .env

export const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.CM_EMAIL,
    pass: process.env.CM_EMAIL_PASS,
  },
});

export const sendEmail = async ({ subject, text, to }: IEmailRequest) => {
  //Com a conexão feita, usamos o método sendMail
  //O método fará o envio do email de acordo com os parâmetros passados
  await transporter
    .sendMail({
      from: process.env.CM_EMAIL,
      to: to,
      subject: subject,
      html: text,
    })
    .then(() => {
      console.log("Email send with success");
    })
    .catch((err: any) => {
      console.log(err);
      throw new AppError(400, "Error sending email, try again later");
    });
};

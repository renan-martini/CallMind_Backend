import "dotenv/config";

export const patient = "Paciente";
export const psychologist = "Psicólogo";

const nodemailer = require("nodemailer");

export const transporter = nodemailer.createTransport({
  service: process.env.CM_EMAIL_SERVICE,
  auth: {
    user: process.env.CM_EMAIL,
    pass: process.env.CM_EMAIL_PASS,
  },
});

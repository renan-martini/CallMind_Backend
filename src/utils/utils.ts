export const patient = "Paciente";
export const psychologist = "Psicólogo";

import { createTransport } from "nodemailer";
import "dotenv/config";

const transporter = createTransport({
  host: "smtp-mail.outlook.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.CM_EMAIL,
    pass: process.env.CM_EMAIL_PASS,
  },
});

export const sendMeentingEmail = async (
  patient: any,
  psychologist: any,
  schedule: any
) => {
  await transporter
    .sendMail({
      from: `Call Mind <${process.env.CM_EMAIL}>`,
      to: `${patient!.user.email}`,
      subject: `Hello ${
        patient!.name
      }, your appointment has been successfully completed`,
      text: `Hello ${patient!.name}, your appointment with ${
        psychologist!.name
      } was successfully completed, date: ${schedule.date} time: ${
        schedule.hour
      }. link to consultation: ${schedule.link}`,
      html: ` <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Call Mind Email</title>
      <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Poppins:wght@500;600;700&display=swap" rel="stylesheet">
    </head>
    <body style="width:100%; height:600px; display:flex;justify-content: center; align-items: center; margin: 0;">
      <div>
          <h2 style="font-family: 'Montserrat', sans-serif;font-weight: 700; margin-top: 16px; font-size: 3rem;color: #54BAB9;">Call <span style="color:#448382 ;">Mind</span></h2>
          <h3 style="font-family: 'Poppins', sans-serif; font-weight: 400;color:#333333;">${patient.name} agendado com sucesso com ${psychologist.name}</h5>
          <h4 style="font-family: 'Poppins', sans-serif; font-weight: 400;font-size: 1.2rem;padding: 0;margin:10px 0;color:#333333;">date: ${schedule.date}</h6>
          <h4 style="font-family: 'Poppins', sans-serif; font-weight: 400;font-size: 1.2rem;padding: 0;margin:10px 0;color:#333333;">time: ${schedule.hour}</h6>
          <a href="${schedule.link}" target="_blank">Sala consulta</a>
      </div>
      <script>
          function envite(){
              window.open("${schedule.link}","_blank")
          }
      </script>
    </body>`,
    })
    .then((message: any) => {
      console.log(message);
    })
    .catch((err: any) => {
      console.log(err);
    });
  await transporter
    .sendMail({
      from: `Call Mind <${process.env.CM_EMAIL}>`,
      to: `${psychologist!.user.email}`,
      subject: `Hello ${psychologist!.name}, patient ${
        patient!.name
      } booked with you`,
      text: `Hello ${psychologist!.name},  patient ${
        patient!.name
      } booked with you , date: ${schedule.date} time: ${schedule.hour}`,
      html: `  <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Call Mind Email</title>
      <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Poppins:wght@500;600;700&display=swap" rel="stylesheet">
    </head>
    <body style="width:100%; height:600px; display:flex;justify-content: center; align-items: center; margin: 0;">
      <div>
          <h2 style="font-family: 'Montserrat', sans-serif; font-weight: 700;margin-top: 16px; font-size: 3rem;color: #54BAB9;">Call <span style="color:#448382 ;">Mind</span></h2>
          <h3 style="font-family: 'Poppins', sans-serif; font-weight: 400;color:#333333;">${patient.name} fez um agendamento com você</h5>
          <h4 style="font-family: 'Poppins', sans-serif; font-weight: 400;font-size: 1.2rem;padding: 0;margin:10px 0;color:#333333;">date: ${schedule.date}</h6>
          <h4 style="font-family: 'Poppins', sans-serif; font-weight: 400;font-size: 1.2rem;padding: 0;margin:10px 0;color:#333333;">time: ${schedule.hour}</h6>
          <a href="${schedule.link}" target="_blank">Sala consulta</a>
      </div>
      <script>
          function envite(){
              window.open("${schedule.link}","_blank")
          }
      </script>
    </body>`,
    })
    .then((message: any) => {
      console.log(message);
    })
    .catch((err: any) => {
      console.log(err);
    });
};

import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import {
  mockedPatient,
  mockedPsycho,
  mockedSchedule,
  mockedUserPatient,
  mockedUserPatientLogin,
  mockedUserPsycho,
  mockedUserPsychoLogin,
} from "../../mocks";

describe("/psychologist", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during DataSource Initialization", err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /psychologist - Mustbe able to create a Psychologist", async () => {
    await request(app).post("/user/register").send(mockedUserPsycho);
    const login = await request(app).post("/login").send(mockedUserPsychoLogin);
    const response = await request(app)
      .post("/psychologists")
      .set("Authorization", `Bearer ${login.body.token}`)
      .send(mockedPsycho);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("img");
    expect(response.body).toHaveProperty("emphasis");
    expect(response.body).toHaveProperty("experience");
    expect(response.body).toHaveProperty("available_times");
    expect(response.body).toHaveProperty("working_days");
    expect(response.body).toHaveProperty("registration");
    expect(response.body).toHaveProperty("name");
    expect(response.body.name).toEqual("Elvis Presley");
    expect(response.body.img).toEqual(
      "https://www.estrelando.com.br/nota/2019/08/01/elvis-presley-queria-se-casar-com-namorada-aos-13-anos-de-idade-diz-site-240163"
    );
    expect(response.body.emphasis).toEqual(
      "Psicologia da Cognição e Personalidade"
    );
    expect(response.body.experience).toEqual("15 anos");
    expect(response.body.available_times).toEqual("8:00 - 22:00");
    expect(response.body.working_days).toEqual(["Wed", "Thu", "Fri"]);
    expect(response.body.registration).toEqual("RK0101");
    expect(response.status).toBe(201);
  });

  test("POST /psychologists - Should not be able to create a Psychologist that already exists", async () => {
    const mockUser = { ...mockedUserPsycho,email: "psycho2@email.com"};
    const loginMock = { email: mockUser.email, password: mockUser.password };
    await request(app).post("/user/register").send(mockUser);
    const login = await request(app).post("/login").send(loginMock);
    const response = await request(app)
      .post("/psychologists")
      .set("Authorization", `Bearer ${login.body.token}`)
      .send(mockedPsycho);
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("GET /psychologist - Must be able to list patients", async () => {
    await request(app).post("/user/register").send(mockedUserPatient);
    let loginPatient = await request(app)
      .post("/login")
      .send(mockedUserPatientLogin);
    await request(app)
      .post("/patients")
      .set("Authorization", `Bearer ${loginPatient.body.token}`)
      .send(mockedPatient);

    const loginPsycho = await request(app)
      .post("/login")
      .send(mockedUserPsychoLogin);

    const schedule = await request(app)
      .post("/schedules")
      .set("Authorization", `Bearer ${loginPsycho.body.token}`)
      .send(mockedSchedule);

    loginPatient = await request(app)
      .post("/login")
      .send(mockedUserPatientLogin);
    await request(app)
      .patch(`/schedules/${schedule.body.id}`)
      .set("Authorization", `Bearer ${loginPatient.body.token}`);

    const response = await request(app)
      .get("/psychologists")
      .set("Authorization", `Bearer ${loginPsycho.body.token}`);

    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0]).toHaveProperty("name");
    expect(response.body[0]).toHaveProperty("img");
    expect(response.body[0]).toHaveProperty("age");
    expect(response.body[0]).toHaveProperty("status");
    expect(response.body[0]).toHaveProperty("schooling");
    expect(response.body[0]).toHaveProperty("profession");
    expect(response.body[0]).toHaveProperty("complaint");
    expect(response.body[0]).toHaveProperty("medication");
    expect(response.body[0]).toHaveProperty("disease");
    expect(response.body[0]).toHaveProperty("userId");

    expect(response.body).toHaveLength(1);
    expect(response.status).toBe(200);
  });

  test("GET /psychologist/patient/:id - Must be able to list Patient on Valid id", async () => {
    const loginPsycho = await request(app)
      .post("/login")
      .send(mockedUserPsychoLogin);
    const patients = await request(app)
      .get("/psychologists")
      .set("Authorization", `Bearer ${loginPsycho.body.token}`);
    const pat = patients.body[0];
    const response = await request(app)
      .get(`/psychologists/patient/${pat.id}`)
      .set("Authorization", `Bearer ${loginPsycho.body.token}`);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("img");
    expect(response.body).toHaveProperty("age");
    expect(response.body).toHaveProperty("status");
    expect(response.body).toHaveProperty("schooling");
    expect(response.body).toHaveProperty("profession");
    expect(response.body).toHaveProperty("complaint")
    expect(response.body).toHaveProperty("medication");
    expect(response.body).toHaveProperty("disease");
    expect(response.body).toHaveProperty("schedules");
    expect(response.body).toHaveProperty("chart");

    expect(response.status).toBe(200);
  });

  test("GET /psychologist/patient/:id - Should not be able to list one patient whith invalid id ", async () => {
    const loginPsycho = await request(app)
      .post("/login")
      .send(mockedUserPsychoLogin);

    const response = await request(app)
      .get(`/psychologists/patient/123489546`)
      .set("Authorization", `Bearer ${loginPsycho.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  test("GET /psychologists/patient - Should not be able to list patients, with Patient Account", async () => {
    let loginPatient = await request(app)
      .post("/login")
      .send(mockedUserPatientLogin);

    const response = await request(app)
      .get("/psychologists")
      .set("Authorization", `Bearer ${loginPatient.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("GET /psychologists/patient:id - Should not be able to list one patient, with Patient Account", async () => {
    let loginPatient = await request(app)
      .post("/login")
      .send(mockedUserPatientLogin);

    const response = await request(app)
      .get(`/psychologists/patient/1231894321215613`)
      .set("Authorization", `Bearer ${loginPatient.body.token}`);
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("POST /psychologist - Should not be able to createPsychologistPerfil with Patient type User", async () => {
    const mockUser = mockedUserPatient;
    mockUser.email = "elvis4@email.com";
    const mockuserLogin = {
      email: mockUser.email,
      password: mockUser.password,
    };

    await request(app).post("/user/register").send(mockUser);
    const login = await request(app).post("/login").send(mockuserLogin);
    const response = await request(app)
      .post("/psychologists")
      .set("Authorization", `Bearer ${login.body.token}`)
      .send(mockedPsycho);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("POST /psychologist- Should not be able to create a Psychologist without a token", async () => {
    const response = await await request(app)
      .post(`/psychologists`)
      .send(mockedPsycho)
      .set("Authorization", `Bearer 1234586421564`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("POST /psychologist- Should not be able to list patients without a token", async () => {
    const response = await await request(app)
      .get(`/psychologists`)
      .set("Authorization", `Bearer 1234586421564`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("POST /psychologist- Should not be able to list one patient without a token", async () => {
    const response = await request(app)
      .get(`/psychologists/patient/1231894321215613`)
      .set("Authorization", `Bearer 1234586421564`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });
});

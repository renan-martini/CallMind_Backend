import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import {
  mockedUserPsycho,
  mockedUserPsychoLogin,
  mockedPsycho,
  mockedUserPatient,
  mockedUserPatientLogin,
  mockedPatient,
  mockedSchedule,
} from "../../mocks";

describe("/schedules", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    await request(app).post("/user/register").send(mockedUserPsycho);
    await request(app).post("/user/register").send(mockedUserPatient);

    const psychoLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserPsychoLogin);
    const patientLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserPatientLogin);

    await request(app)
      .post("/psychologists")
      .set("Authorization", `Bearer ${psychoLoginResponse.body.token}`)
      .send(mockedPsycho);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /patients -  should be able to create a patient", async () => {
    const patientLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserPatientLogin);
    const response = await request(app)
      .post("/patients")
      .set("Authorization", `Bearer ${patientLoginResponse.body.token}`)
      .send(mockedPatient);

    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("img");
    expect(response.body).toHaveProperty("age");
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("status");
    expect(response.body).toHaveProperty("schooling");
    expect(response.body).toHaveProperty("profession");
    expect(response.body).toHaveProperty("complaint");
    expect(response.body).toHaveProperty("medication");
    expect(response.body).toHaveProperty("disease");
    expect(response.body).toHaveProperty("user");
    expect(response.body).not.toHaveProperty("schedules");
    expect(response.status).toBe(201);
  });

  test("POST /patients -  should not be able to create a patient being a psychologist", async () => {
    const psychoLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserPsychoLogin);
    const response = await request(app)
      .post("/patients")
      .set("Authorization", `Bearer ${psychoLoginResponse.body.token}`)
      .send(mockedPatient);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("GET /patients -  patients should be able to list psychologists", async () => {
    const patientLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserPatientLogin);
    const response = await request(app)
      .get("/patients")
      .set("Authorization", `Bearer ${patientLoginResponse.body.token}`);

    expect(response.body).toHaveLength(1);
    expect(response.status).toBe(200);
  });

  test("GET /psychologists -  patients should not be able to list other patients", async () => {
    const patientLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserPatientLogin);
    const response = await request(app)
      .get("/psychologists")
      .set("Authorization", `Bearer ${patientLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("GET /patients -  patients should be able to list a psychologist by id", async () => {
    const patientLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserPatientLogin);

    const psychos = await request(app)
      .get("/patients")
      .set("Authorization", `Bearer ${patientLoginResponse.body.token}`);

    const response = await request(app)
      .get(`/patients/psychologist/${psychos.body[0].id}`)
      .set("Authorization", `Bearer ${patientLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("img");
    expect(response.body).toHaveProperty("emphasis");
    expect(response.body).toHaveProperty("experience");
    expect(response.body).toHaveProperty("available_times");
    expect(response.body).toHaveProperty("working_days");
    expect(response.body).toHaveProperty("registration");
    expect(response.status).toBe(200);
  });
});

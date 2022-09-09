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

    console.log(psychoLoginResponse.body);

    await request(app)
      .post("/psychologists")
      .set("Authorization", `Bearer ${psychoLoginResponse.body.token}`)
      .send(mockedPsycho);
    await request(app)
      .post("/patients")
      .set("Authorization", `Bearer ${patientLoginResponse.body.token}`)
      .send(mockedPatient);

    const patientResponse = await request(app)
      .get("/psychologists")
      .set("Authorization", `Bearer ${psychoLoginResponse.body.token}`);

    const psychoResponse = await request(app)
      .get("/psychologists")
      .set("Authorization", `Bearer ${patientLoginResponse.body.token}`);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /schedules -  should be able to create a schedule", async () => {
    const psychoLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserPsychoLogin);
    const response = await request(app)
      .post("/schedules")
      .set("Authorization", `Bearer ${psychoLoginResponse.body.token}`)
      .send(mockedSchedule);

    expect(response.body).toHaveProperty("date");
    expect(response.body).toHaveProperty("hour");
    expect(response.body).toHaveProperty("link");
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("available");
    //expect(response.body).not.toHaveProperty("psychologist");
    expect(response.status).toBe(201);
  });

  test("POST /schedules -  should not be able to create a schedule that already exists", async () => {
    const psychoLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserPsychoLogin);
    const response = await request(app)
      .post("/schedules")
      .set("Authorization", `Bearer ${psychoLoginResponse.body.token}`)
      .send(mockedSchedule);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("POST /schedules -  patients should not be able to create schedules", async () => {
    const patientLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserPatientLogin);
    const response = await request(app)
      .post("/schedules")
      .set("Authorization", `Bearer ${patientLoginResponse.body.token}`)
      .send(mockedSchedule);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("POST /schedules -  should not be able to create a schedule with an invalid token", async () => {
    const response = await request(app)
      .post("/schedules")
      .set("Authorization", `Bearer sadfdskafdksjfhadksjfkldsjf`)
      .send(mockedSchedule);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("POST /schedules/:id -  patients should be able to book a schedule", async () => {
    const psychoLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserPsychoLogin);
    const schedules: any = await request(app)
      .get("/schedules")
      .set("Authorization", `Bearer ${psychoLoginResponse.body.token}`);
    const patientLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserPatientLogin);

    const response = await request(app)
      .patch(`/schedules/${schedules.body[0].id}`)
      .set("Authorization", `Bearer ${patientLoginResponse.body.token}`)
      .send(mockedSchedule);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(202);
  });

  test("POST /schedules/:id -  should not be able to book a schedule without authentication", async () => {
    const psychoLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserPsychoLogin);
    const schedules: any = await request(app)
      .get("/schedules")
      .set("Authorization", `Bearer ${psychoLoginResponse.body.token}`);

    const response = await request(app)
      .patch(`/schedules/${schedules.body[0].id}`)
      .set("Authorization", `Bearer sdafdfdasfadf`)
      .send(mockedSchedule);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("POST /schedules/:id -  should not be able to book a schedule with invalid id", async () => {
    const patientLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserPatientLogin);

    const response = await request(app)
      .patch(`/schedules/asdfdsafdasfd`)
      .set("Authorization", `Bearer ${patientLoginResponse.body.token}`)
      .send(mockedSchedule);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("POST /schedules/:id -  should not be able to book an unavailable date/hour", async () => {
    const psychoLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserPsychoLogin);
    const schedules: any = await request(app)
      .get("/schedules")
      .set("Authorization", `Bearer ${psychoLoginResponse.body.token}`);
    const patientLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserPatientLogin);

    const response = await request(app)
      .patch(`/schedules/${schedules.body[0].id}`)
      .set("Authorization", `Bearer ${patientLoginResponse.body.token}`)
      .send(mockedSchedule);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(303);
  });

  test("GET /schedules -  patients should be able to list their schedules", async () => {
    const patientLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserPatientLogin);
    const response: any = await request(app)
      .get("/schedules")
      .set("Authorization", `Bearer ${patientLoginResponse.body.token}`);

    expect(response.body).toHaveLength(1);
    expect(response.status).toBe(200);
  });

  test("GET /schedules -  psychologists should be able to list their schedules", async () => {
    const psychoLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserPsychoLogin);
    const response: any = await request(app)
      .get("/schedules")
      .set("Authorization", `Bearer ${psychoLoginResponse.body.token}`);

    expect(response.body).toHaveLength(1);
    expect(response.status).toBe(200);
  });
});

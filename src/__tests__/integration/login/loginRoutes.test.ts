import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import {
  mockedUserPatientLogin,
  mockedUserPatient,
  mockedUserPsychoLogin,
} from "../../mocks";
import { rotaLogin, rotaUsuario } from "../../mocks/routes";

describe("/login", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    await request(app).post(rotaUsuario).send(mockedUserPatient);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("POST /login -  should be able to login with the user", async () => {
    const response = await request(app)
      .post(rotaLogin)
      .send(mockedUserPatientLogin);

    expect(response.body).toHaveProperty("token");
    expect(response.status).toBe(200);
  });

  it("POST /login -  should not be able to login with the user with incorrect password or email", async () => {
    const response = await request(app)
      .post(rotaLogin)
      .send(mockedUserPsychoLogin);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });
});

import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import {
  mockedUserDelete,
  mockedUserDeleteLogin,
  mockedUserPatient,
  mockedUserPsycho,
} from "../../mocks";
import { rotaUsuario, rotaUsuarioDelete } from "../../mocks/routes";

describe("Registro de Usuário", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("POST /register -  Must be able to create a user Patient", async () => {
    const response = await request(app)
      .post(rotaUsuario)
      .send(mockedUserPatient);
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("userName");
    expect(response.body).toHaveProperty("type");
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("first_Login");
    expect(response.body).toHaveProperty("isActive");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body).not.toHaveProperty("password");

    expect(response.body.userName).toEqual(mockedUserPatient.userName);
    expect(response.body.email).toEqual(mockedUserPatient.email);
    expect(response.body.type).toEqual(mockedUserPatient.type);
    expect(response.body.isActive).toEqual(true);
    expect(response.body.first_Login).toEqual(true);
    expect(response.status).toBe(201);
  });

  it("POST /register -  Must be able to create a user Psychologist", async () => {
    const response = await request(app)
      .post(rotaUsuario)
      .send(mockedUserPsycho);
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("userName");
    expect(response.body).toHaveProperty("type");
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("first_Login");
    expect(response.body).toHaveProperty("isActive");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body).not.toHaveProperty("password");

    expect(response.body.userName).toEqual(mockedUserPsycho.userName);
    expect(response.body.email).toEqual(mockedUserPsycho.email);
    expect(response.body.type).toEqual(mockedUserPsycho.type);
    expect(response.body.isActive).toEqual(true);
    expect(response.body.first_Login).toEqual(true);
    expect(response.status).toBe(201);
  });

  it("POST /register -  should not be able to create a user that already exists", async () => {
    const response = await request(app)
      .post(rotaUsuario)
      .send(mockedUserPatient);
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });
  it("DELETE /users/:id -  Must be able to soft delete user", async () => {
    await request(app).post(rotaUsuario).send(mockedUserDelete);

    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserDeleteLogin);

    const response = await request(app)
      .patch(rotaUsuarioDelete)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(response.status).toBe(204);
  });
  it("DELETE /users/:id -  Must not be able to soft delete user", async () => {
    await request(app).post(rotaUsuario).send(mockedUserDelete);

    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserDeleteLogin);

    const response = await request(app)
      .patch(rotaUsuarioDelete)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });
});

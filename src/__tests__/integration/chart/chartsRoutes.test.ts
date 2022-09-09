import { DataSource } from "typeorm"
import AppDataSource from "../../../data-source"
import request from "supertest"
import app from "../../../app"
import { mockedChart, mockedPatient, mockedPsycho, mockedUserPatient, mockedUserPatientLogin, mockedUserPsycho, mockedUserPsychoLogin } from "../../mocks"

describe("/schedules", () => {
    let connection: DataSource

    beforeAll(async() => {
        await AppDataSource.initialize().then((res) => {
            connection = res
        }).catch((err) => {
            console.error("Error during Data Source initialization", err)
        })

    await request(app).post("/register").send(mockedUserPsycho);
    await request(app).post("/register").send(mockedUserPatient);

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
    })

    afterAll(async() => {
        await connection.destroy()
    })

    test("POST /patients/:id/charts -  should be able to create a chart",async () => {
        const psychoLoginResponse = await request(app).post('/login').send(mockedUserPsychoLogin)
        const patientLoginResponse = await request(app).post('/login').send(mockedUserPatientLogin)

        const patientResponse = await request(app)
        .post("/patients")
        .set("Authorization", `Bearer ${patientLoginResponse.body.token}`)
        .send(mockedPatient)

        const response = await request(app)
        .post(`/patients/${patientResponse.body.id}/charts`)
        .set("Authorization", `Bearer ${psychoLoginResponse.body.token}`)
        .send(mockedChart)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(201)
    })

    test("GET /patients/:id/charts -  should be able to list a chart",async () => {
        const psychoLoginResponse = await request(app).post('/login').send(mockedUserPsychoLogin)
        const patientLoginResponse = await request(app).post('/login').send(mockedUserPatientLogin)

        const patientResponse = await request(app)
        .post("/patients")
        .set("Authorization", `Bearer ${patientLoginResponse.body.token}`)
        .send(mockedPatient)

        const response = await request(app)
        .get(`/patients/${patientResponse.body.id}/charts`)
        .set("Authorization", `Bearer ${psychoLoginResponse.body.token}`)

        expect(response.body[0]).toHaveProperty("id")
        expect(response.body[0]).toHaveProperty("date")
        expect(response.body[0]).toHaveProperty("description")
        expect(response.status).toBe(200)
    })

    test("POST /patients/:id/charts -  should be not able to create a chart",async () => {
        const psychoLoginResponse = await request(app).post('/login').send(mockedUserPsychoLogin)
        const patientLoginResponse = await request(app).post('/login').send(mockedUserPatientLogin)

        const patientResponse = await request(app)
        .post("/patients")
        .set("Authorization", `Bearer ${patientLoginResponse.body.token}`)
        .send(mockedPatient)

        const response = await request(app)
        .post(`/patients/asdfasd*WER%%$%DASFSD/charts`)
        .set("Authorization", `Bearer ${psychoLoginResponse.body.token}`)
        .send(mockedChart)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(400)
    })

    test("GET /patients/:id/charts -  should be not able to list a chart",async () => {
        const psychoLoginResponse = await request(app).post('/login').send(mockedUserPsychoLogin)
        const patientLoginResponse = await request(app).post('/login').send(mockedUserPatientLogin)

        const patientResponse = await request(app)
        .post("/patients")
        .set("Authorization", `Bearer ${patientLoginResponse.body.token}`)
        .send(mockedPatient)

        const response = await request(app)
        .post(`/patients/asdfasd*WER%%$%DASFSD/charts`)
        .set("Authorization", `Bearer ${psychoLoginResponse.body.token}`)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(400)
    })
})
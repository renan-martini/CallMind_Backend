import { DataSource } from "typeorm"
import AppDataSource from "../../../data-source"
import request from "supertest"
import app from "../../../app"
import { mockedChart, mockedPatient, mockedPsycho, mockedUserPatient, mockedUserPatientLogin, mockedUserPsycho, mockedUserPsychoLogin } from "../../mocks"

describe("/schedules", () => {
    let connection: DataSource
    let patientBody: any

    beforeAll(async() => {
        await AppDataSource.initialize().then((res) => {
            connection = res
        }).catch((err) => {
            console.error("Error during Data Source initialization", err)
        })

        await request(app).post('/user/register').send(mockedUserPatient)        
        const patientLoginResponse = await request(app).post('/login').send(mockedUserPatientLogin)

        await request(app).post('/user/register').send(mockedUserPsycho)
        const psychoLoginResponse = await request(app).post('/login').send(mockedUserPsychoLogin)
        const psychoResponse = await request(app).post('/psychologists').set("Authorization", `Bearer ${psychoLoginResponse.body.token}`).send(mockedPsycho)
    })

    afterAll(async() => {
        await connection.destroy()
    })

    test("POST /patients/:id/charts - should be able to create a chart",async () => {
        const psychoLoginResponse = await request(app).post('/login').send(mockedUserPsychoLogin)
        const patientLoginResponse = await request(app).post('/login').send(mockedUserPatientLogin)
        const patientResponse = await request(app).post('/patients').set("Authorization", `Bearer ${patientLoginResponse.body.token}`).send(mockedPatient)

        patientBody = patientResponse.body

        const response = await request(app).post(`/patients/${patientResponse.body.id}/charts`).set("Authorization", `Bearer ${psychoLoginResponse.body.token}`)
        .send(mockedChart)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(201)
    })

    test("GET /patients/:id/charts - should be able to list a chart",async () => {
        const psychoLoginResponse = await request(app).post('/login').send(mockedUserPsychoLogin)
        const patientLoginResponse = await request(app).post('/login').send(mockedUserPatientLogin)

        const response = await request(app).get(`/patients/${patientBody.id}/charts`).set("Authorization", `Bearer ${psychoLoginResponse.body.token}`)

        expect(response.body[0]).toHaveProperty("id")
        expect(response.body[0]).toHaveProperty("date")
        expect(response.body[0]).toHaveProperty("description")
        expect(response.status).toBe(200)
    })

    test("POST /patients/:id/charts - should not be able to create a chart",async () => {
        const psychoLoginResponse = await request(app).post('/login').send(mockedUserPsychoLogin)
        const patientLoginResponse = await request(app).post('/login').send(mockedUserPatientLogin)

        const response = await request(app).post(`/patients/7as6df987a6sdf9786asdf/charts`).set("Authorization", `Bearer ${psychoLoginResponse.body.token}`)
        .send(mockedChart)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(400)
    })

    test("GET /patients/:id/charts - should not be able to list charts",async () => {
        const psychoLoginResponse = await request(app).post('/login').send(mockedUserPsychoLogin)
        const patientLoginResponse = await request(app).post('/login').send(mockedUserPatientLogin)

        const response = await request(app).post(`/patients/7as6df987a6sdf9786asdf/charts`).set("Authorization", `Bearer ${psychoLoginResponse.body.token}`)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(400)
    })

    test("POST /patients/:id/charts - should not be able to create a chart | typeUser = patient",async () => {
        const psychoLoginResponse = await request(app).post('/login').send(mockedUserPsychoLogin)
        const patientLoginResponse = await request(app).post('/login').send(mockedUserPatientLogin)

        const response = await request(app).post(`/patients/${patientBody.id}/charts`).set("Authorization", `Bearer ${patientLoginResponse.body.token}`)
        .send(mockedChart)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(400)
    })

    test("GET /patients/:id/charts - should not be able to list charts | typeUser = patient",async () => {
        const psychoLoginResponse = await request(app).post('/login').send(mockedUserPsychoLogin)
        const patientLoginResponse = await request(app).post('/login').send(mockedUserPatientLogin)

        const response = await request(app).post(`/patients/${patientBody.id}/charts`).set("Authorization", `Bearer ${patientLoginResponse.body.token}`)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(400)
    })

    test("POST /patients/:id/charts - should not be able to create a chart | invalid token",async () => {
        const psychoLoginResponse = await request(app).post('/login').send(mockedUserPsychoLogin)
        const patientLoginResponse = await request(app).post('/login').send(mockedUserPatientLogin)

        const response = await request(app).post(`/patients/${patientBody.id}/charts`).set("Authorization", `Bearer ${"ASDFASDF$%FGDFGDFGfadfa$%677788sgsdfgsdfg"}`)
        .send(mockedChart)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
    })

    test("GET /patients/:id/charts - should not be able to list charts | invalid token",async () => {

        const response = await request(app).get(`/patients/${patientBody.id}/charts`).set("Authorization", `Bearer ${"ASDFAfghfghfghfSDF$%FGDFGDFGfadfa$%677788sgsdfgsdfg"}`)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
    })
})
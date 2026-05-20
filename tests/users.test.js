const request = require("supertest");
const app = require("../app");

const { resetUsers } = require("../data/usersData");

describe("Testes de integração na API /users", () => {
  beforeEach(() => {
    resetUsers();
  });

  it("GET /users deve retornar lista de usuários", async () => {
    const res = await request(app).get("/users");

    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(2);
  });

  it("POST /users deve criar um novo usuário", async () => {
    const res = await request(app).post("/users").send({ name: "Charlie" });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toBe("Charlie");
  });

  it("POST /users sem name deve retornar erro 400", async () => {
    const res = await request(app).post("/users").send({});

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error", "É necessário preencher o nome.");
  });

  it("GET /users/:id deve retornar usuário existente", async () => {
    const res = await request(app).get("/users/1");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id", 1);
    expect(res.body).toHaveProperty("name", "Aline Dias");
  });

  it("GET /users/:id deve retornar 404 para usuário inexistente", async () => {
    const res = await request(app).get("/users/999");

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("error");
  });

  it("PUT /users/:id deve atualizar usuário", async () => {
    const res = await request(app)
      .put("/users/1")
      .send({ name: "Aline Silva" });

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Aline Silva");
  });

  it("DELETE /users/:id deve remover usuário", async () => {
    const res = await request(app).delete("/users/1");

    expect(res.statusCode).toBe(200);
  });

  it("DELETE /users/:id deve retornar 404 para usuário inexistente", async () => {
    const res = await request(app).delete("/users/999");

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("error");
  });
});

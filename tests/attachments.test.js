const request = require("supertest");
const app = require("../app");

const { resetAttachments } = require("../data/attachmentsData");
const { resetUsers } = require("../data/usersData");
const { resetTasks } = require("../data/tasksData");

describe("Testes de integração na API /attachments", () => {
  beforeEach(() => {
    resetAttachments();
    resetUsers();
    resetTasks();
  });

  it("GET /attachments deve retornar lista de anexos", async () => {
    const res = await request(app).get("/attachments");

    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(2);
  });

  it("POST /attachments deve criar um novo anexo", async () => {
    const res = await request(app)
      .post("/attachments")
      .send({
        filename: "notas.txt",
        url: "/files/notas.txt",
        taskId: 1,
        userId: 1,
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.filename).toBe("notas.txt");
    expect(res.body.taskId).toBe(1);
    expect(res.body.userId).toBe(1);
  });

  it("POST /attachments sem filename deve retornar erro 400", async () => {
    const res = await request(app)
      .post("/attachments")
      .send({ url: "/files/notas.txt", taskId: 1, userId: 1 });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty(
      "error",
      "É necessário informar o nome do arquivo.",
    );
  });

  it("POST /attachments deve retornar erro se o usuário não existir", async () => {
    const res = await request(app)
      .post("/attachments")
      .send({
        filename: "anexo.pdf",
        url: "/files/anexo.pdf",
        taskId: 1,
        userId: 999,
      });

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("error", "Usuário não encontrado.");
  });

  it("POST /attachments deve retornar erro se a tarefa não existir", async () => {
    const res = await request(app)
      .post("/attachments")
      .send({
        filename: "anexo.pdf",
        url: "/files/anexo.pdf",
        taskId: 999,
        userId: 1,
      });

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("error", "Tarefa não encontrada.");
  });

  it("GET /attachments/:id deve retornar anexo existente", async () => {
    const res = await request(app).get("/attachments/1");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id", 1);
    expect(res.body).toHaveProperty("filename", "relatorio.pdf");
  });

  it("GET /attachments/:id deve retornar 404 para anexo inexistente", async () => {
    const res = await request(app).get("/attachments/999");

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("error");
  });

  it("DELETE /attachments/:id deve remover anexo", async () => {
    const res = await request(app).delete("/attachments/1");

    expect(res.statusCode).toBe(200);
  });

  it("DELETE /attachments/:id deve retornar 404 para anexo inexistente", async () => {
    const res = await request(app).delete("/attachments/999");

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("error");
  });
});

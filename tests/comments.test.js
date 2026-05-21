const request = require("supertest");
const app = require("../app");

const { resetComments } = require("../data/commentsData");
const { resetTasks } = require("../data/tasksData");
const { resetUsers } = require("../data/usersData");

describe("Testes de integração na API /comments", () => {
  beforeEach(() => {
    resetTasks();
    resetComments();
    resetUsers();
  });

  it("GET /comments deve retornar lista de comentários", async () => {
    const res = await request(app).get("/comments");

    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(2);
  });

  it("POST /comments deve criar um novo comentário", async () => {
    const res = await request(app)
      .post("/comments")
      .send({ content: "Novo comentário", taskId: 1, userId: 1 });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.content).toBe("Novo comentário");
    expect(res.body.taskId).toBe(1);
    expect(res.body.userId).toBe(1);
  });

  it("POST /comments sem content deve retornar erro 400", async () => {
    const res = await request(app).post("/comments").send({ userId: 1 });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty(
      "error",
      "É necessário informar o conteúdo do comentário.",
    );
  });

  it("POST /comments deve retornar erro se o usuário não existir", async () => {
    const res = await request(app).post("/comments").send({
      content: "Comentário inválido",
      userId: 999,
    });

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("error", "Usuário não encontrado.");
  });

  it("GET /users/:id/comments deve retornar comentários do usuário", async () => {
    const res = await request(app).get("/users/1/comments");

    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);

    res.body.forEach((comment) => {
      expect(comment.userId).toBe(1);
    });
  });
});

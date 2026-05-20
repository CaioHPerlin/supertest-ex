const express = require("express");
const router = express.Router();
const { users } = require("../data/usersData");
const { tasks } = require("../data/tasksData");

router.get("/", (req, res) => {
  res.json(users);
});

router.post("/", (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      error: "É necessário preencher o nome.",
    });
  }

  const newUser = {
    id: users.length + 1,
    name,
  };

  users.push(newUser);

  res.status(201).json(newUser);
});

router.get("/:id/tasks", (req, res) => {
  const id = Number(req.params.id);

  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(404).json({
      error: "Usuário não encontrado.",
    });
  }

  const userTasks = tasks.filter((task) => task.userId === id);

  res.json(userTasks);
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(404).json({
      error: "Usuário não encontrado.",
    });
  }

  res.json(user);
});

router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const { name } = req.body;

  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(404).json({
      error: "Usuário não encontrado.",
    });
  }

  user.name = name;

  res.json(user);
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = users.findIndex((user) => user.id === id);

  if (index === -1) {
    return res.status(404).json({
      error: "Usuário não encontrado.",
    });
  }

  users.splice(index, 1);

  res.json({ message: "Usuário removido com sucesso." });
});

module.exports = router;

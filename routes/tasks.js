const express = require("express");
const router = express.Router();
const { tasks } = require("../data/tasksData");
const { users } = require("../data/usersData");
const { comments } = require("../data/commentsData");

router.get("/", (req, res) => {
  res.json(tasks);
});

router.post("/", (req, res) => {
  const { title, userId } = req.body;

  if (!title) {
    return res.status(400).json({
      error: "É necessário informar o título da tarefa.",
    });
  }

  const userExists = users.find((user) => user.id === userId);

  if (!userExists) {
    return res.status(404).json({
      error: "Usuário não encontrado.",
    });
  }

  const newTask = {
    id: tasks.length + 1,
    title,
    completed: false,
    userId,
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
});

router.get("/:id/comments", (req, res) => {
  const id = Number(req.params.id);

  const task = tasks.find((task) => task.id === id);

  if (!task) {
    return res.status(404).json({
      error: "Tarefa não encontrada.",
    });
  }

  const taskComments = comments.filter((comment) => comment.taskId === id);
  console.log(taskComments);
  res.json(taskComments);
});

module.exports = router;

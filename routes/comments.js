// arquivo substituído — entidade movida para attachments.js
const express = require("express");
const router = express.Router();
module.exports = router;

router.get("/", (req, res) => {
  res.json(comments);
});

router.post("/", (req, res) => {
  const { content, taskId, userId } = req.body;

  if (!content) {
    return res.status(400).json({
      error: "É necessário informar o conteúdo do comentário.",
    });
  }

  const userExists = users.find((user) => user.id === userId);

  if (!userExists) {
    return res.status(404).json({
      error: "Usuário não encontrado.",
    });
  }

  const taskExists = tasks.find((task) => task.id === taskId);

  if (!taskExists) {
    return res.status(404).json({
      error: "Tarefa não encontrada.",
    });
  }

  const newComment = {
    id: comments.length + 1,
    content,
    taskId,
    userId,
  };

  comments.push(newComment);

  res.status(201).json(newComment);
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  const comment = comments.find((comment) => comment.id === id);

  if (!comment) {
    return res.status(404).json({
      error: "Comentário não encontrado.",
    });
  }

  res.json(comment);
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = comments.findIndex((comment) => comment.id === id);

  if (index === -1) {
    return res.status(404).json({
      error: "Comentário não encontrado.",
    });
  }

  comments.splice(index, 1);

  res.json({ message: "Comentário removido com sucesso." });
});

module.exports = router;

const express = require("express");
const router = express.Router();
const { attachments } = require("../data/attachmentsData");
const { users } = require("../data/usersData");
const { tasks } = require("../data/tasksData");

router.get("/", (req, res) => {
  res.json(attachments);
});

router.post("/", (req, res) => {
  const { filename, url, taskId, userId } = req.body;

  if (!filename) {
    return res.status(400).json({
      error: "É necessário informar o nome do arquivo.",
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

  const newAttachment = {
    id: attachments.length + 1,
    filename,
    url,
    taskId,
    userId,
  };

  attachments.push(newAttachment);

  res.status(201).json(newAttachment);
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  const attachment = attachments.find((attachment) => attachment.id === id);

  if (!attachment) {
    return res.status(404).json({
      error: "Anexo não encontrado.",
    });
  }

  res.json(attachment);
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = attachments.findIndex((attachment) => attachment.id === id);

  if (index === -1) {
    return res.status(404).json({
      error: "Anexo não encontrado.",
    });
  }

  attachments.splice(index, 1);

  res.json({ message: "Anexo removido com sucesso." });
});

module.exports = router;

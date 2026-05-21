const express = require("express");
const app = express();

const usersRouter = require("./routes/users");
const tasksRouter = require("./routes/tasks");
const attachmentsRouter = require("./routes/attachments");
const commentsRouter = require("./routes/comments");

app.use(express.json());

app.use("/users", usersRouter);
app.use("/tasks", tasksRouter);
app.use("/attachments", attachmentsRouter);
app.use("/comments", commentsRouter);

module.exports = app;

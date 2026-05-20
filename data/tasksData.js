const initialTasks = [
  {
    id: 1,
    title: "Estudar testes de integração",
    completed: false,
    userId: 1,
  },
  {
    id: 2,
    title: "Criar testes com SuperTest",
    completed: true,
    userId: 2,
  },
];

const tasks = [...initialTasks];

function resetTasks() {
  tasks.length = 0;
  tasks.push(...initialTasks);
}

module.exports = {
  tasks,
  resetTasks,
};

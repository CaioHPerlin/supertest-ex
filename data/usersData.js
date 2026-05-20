const initialUsers = [
  { id: 1, name: "Aline Dias" },
  { id: 2, name: "Roberto Carlos" },
];

const users = [...initialUsers];

function resetUsers() {
  users.length = 0;
  users.push(...initialUsers);
}

module.exports = {
  users,
  resetUsers,
};

const initialAttachments = [
  {
    id: 1,
    filename: "relatorio.pdf",
    url: "/files/relatorio.pdf",
    taskId: 1,
    userId: 1,
  },
  {
    id: 2,
    filename: "diagrama.png",
    url: "/files/diagrama.png",
    taskId: 2,
    userId: 2,
  },
];

const attachments = [...initialAttachments];

function resetAttachments() {
  attachments.length = 0;
  attachments.push(...initialAttachments);
}

module.exports = {
  attachments,
  resetAttachments,
};

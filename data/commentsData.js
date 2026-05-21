const initialComments = [
    {
        id: 1,
        content: "Ótimo trabalho na tarefa!",
        taskId: 1,
        userId: 2
    },
    {
        id: 2,
        content: "LGTM.",
        taskId: 1,
        userId: 1
    },
    {
        id: 3,
        content: "Precisamos revisar os requisitos.",
        taskId: 2,
        userId: 1
    }
]

const comments = [...initialComments];

function resetComments() {
    comments.length = 0;    
    comments.push(...initialComments);
}

module.exports = {
    comments,
    resetComments
}
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Async function that fetches a list of todos and filters out those that are not completed
async function fetchCompletedTodos() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const todos = await response.json();
        const completed = todos.filter((todo) => todo.completed);
        console.log(completed);
    }
    catch (error) {
        console.error('Fetch error:', error);
    }
}
fetchCompletedTodos();
//# sourceMappingURL=bai23.js.map
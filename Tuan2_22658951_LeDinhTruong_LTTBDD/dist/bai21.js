"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function fetchTodo() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
        if (!response.ok) {
            throw new Error('Phản hồi của mạng không ổn định');
        }
        const data = await response.json();
        console.log(data);
    }
    catch (error) {
        console.error('Lỗi Fetch:', error);
    }
}
// Call the API multiple times and log the results
async function fetchMultipleTodos(ids) {
    for (const id of ids) {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
            if (!response.ok) {
                throw new Error('Phản hồi của mạng không ổn định');
            }
            const data = await response.json();
            console.log(data);
        }
        catch (error) {
            console.error('Lỗi Fetch:', error);
        }
    }
}
fetchTodo();
fetchMultipleTodos([1, 2, 3]);
//# sourceMappingURL=bai21.js.map
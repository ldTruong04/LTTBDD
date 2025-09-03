"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Simulate an async task
function asyncTask(id) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(`Task ${id} done`);
        }, 1000 + id * 200); // Slightly different times for each
    });
}
// Async function that processes 5 async tasks at once using Promise.all
async function batchProcess() {
    const tasks = [1, 2, 3, 4, 5].map(id => asyncTask(id));
    const results = await Promise.all(tasks);
    console.log(results);
}
batchProcess();
//# sourceMappingURL=bai28.js.map
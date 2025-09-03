"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Simulate an async task
function asyncTask(id) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(`Task ${id} done`);
        }, 1000);
    });
}
// Async function that processes tasks sequentially in a queue
async function queueProcess() {
    const ids = [1, 2, 3, 4, 5];
    for (const id of ids) {
        const result = await asyncTask(id);
        console.log(result);
    }
}
queueProcess();
//# sourceMappingURL=bai29.js.map
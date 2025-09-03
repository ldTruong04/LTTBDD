"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function simulateTask(ms) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Nhiệm vụ hoàn thành trong ${ms}ms`);
        }, ms);
    });
}
async function runSimulatedTask() {
    const result = await simulateTask(2000);
    console.log(result);
}
runSimulatedTask();
//# sourceMappingURL=bai12.js.map
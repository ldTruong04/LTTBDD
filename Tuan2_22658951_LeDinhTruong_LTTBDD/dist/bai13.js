"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function simulateTask(ms, shouldFail = false) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldFail) {
                reject(new Error(`Task failed after ${ms}ms`));
            }
            else {
                resolve(`Task finished in ${ms}ms`);
            }
        }, ms);
    });
}
async function runSimulatedTaskWithError() {
    try {
        const result = await simulateTask(2000, true);
        console.log(result);
    }
    catch (error) {
        console.error('Error:', error);
    }
}
runSimulatedTaskWithError();
//# sourceMappingURL=bai13.js.map
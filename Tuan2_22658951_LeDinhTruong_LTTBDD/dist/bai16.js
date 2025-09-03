"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Example async functions
async function asyncFunc1() {
    return new Promise(resolve => {
        setTimeout(() => resolve('Result 1'), 1000);
    });
}
async function asyncFunc2() {
    return new Promise(resolve => {
        setTimeout(() => resolve('Result 2'), 1000);
    });
}
async function asyncFunc3() {
    return new Promise(resolve => {
        setTimeout(() => resolve('Result 3'), 1000);
    });
}
async function runInParallel() {
    const results = await Promise.all([
        asyncFunc1(),
        asyncFunc2(),
        asyncFunc3()
    ]);
    console.log(results);
}
runInParallel();
//# sourceMappingURL=bai16.js.map
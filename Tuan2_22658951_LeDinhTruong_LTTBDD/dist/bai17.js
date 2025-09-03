"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const promises = [
    Promise.resolve(1),
    Promise.resolve(2),
    Promise.resolve(3)
];
async function iteratePromises() {
    for await (const value of promises) {
        console.log(value);
    }
}
iteratePromises();
//# sourceMappingURL=bai17.js.map
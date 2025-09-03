"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function tripleAfterDelay(num) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(num * 3);
        }, 1000);
    });
}
tripleAfterDelay(5).then(result => console.log(result)); // 15
//# sourceMappingURL=bai14.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helloAsync = new Promise((resolve) => {
    setTimeout(() => {
        resolve("Hello Async");
    }, 2000);
});
helloAsync.then((message) => {
    console.log(message);
});
//# sourceMappingURL=bai1.js.map
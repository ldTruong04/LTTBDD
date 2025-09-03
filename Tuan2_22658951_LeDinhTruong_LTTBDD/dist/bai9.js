"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const arr = [1, 2, 3, 4, 5, 6];
new Promise((resolve) => {
    setTimeout(() => {
        resolve(arr);
    }, 1000);
})
    .then(numbers => numbers.filter(num => num % 2 === 0))
    .then(evens => console.log(evens)); // 2, 4, 6
//# sourceMappingURL=bai9.js.map
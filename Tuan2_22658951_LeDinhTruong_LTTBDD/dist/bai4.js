"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const randomNumberPromise = new Promise((resolve, reject) => {
    try {
        const num = Math.random();
        resolve(num);
    }
    catch (error) {
        reject(error);
    }
});
randomNumberPromise
    .then((num) => {
    console.log('Random number:', num);
})
    .catch((error) => {
    console.error('Error:', error);
});
//# sourceMappingURL=bai4.js.map
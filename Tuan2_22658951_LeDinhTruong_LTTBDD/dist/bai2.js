"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getNumberAsync() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(10);
        }, 1000);
    });
}
getNumberAsync().then((num) => {
    console.log(num);
});
//# sourceMappingURL=bai2.js.map
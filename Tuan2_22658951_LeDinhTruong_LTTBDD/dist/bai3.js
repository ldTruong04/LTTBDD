"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function rejectAfterOneSecond() {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject(new Error("Something went wrong"));
        }, 1000);
    });
}
rejectAfterOneSecond()
    .then(() => { })
    .catch((error) => {
    console.error(error.message);
});
//# sourceMappingURL=bai3.js.map
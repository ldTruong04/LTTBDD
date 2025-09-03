"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function simulateTask7(id, time) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Nhiệm vụ ${id} thực hiện sau ${time}ms`);
        }, time);
    });
}
const promises = [
    simulateTask7(1, 1000),
    simulateTask7(2, 1500),
    simulateTask7(3, 2000)
];
Promise.race(promises)
    .then((result) => {
    console.log('nhiệm vụ đầu tiên đã hoàn thành:', result);
})
    .catch((error) => {
    console.error('Lỗi:', error);
});
//# sourceMappingURL=bai7.js.map
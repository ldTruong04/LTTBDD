"use strict";
function simulateTask6(id, time) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Task ${id} done after ${time}ms`);
        }, time);
    });
}
const promises = [
    simulateTask6(1, 1000),
    simulateTask6(2, 1500),
    simulateTask6(3, 2000)
];
Promise.all(promises)
    .then((results) => {
    console.log('All tasks completed:', results);
})
    .catch((error) => {
    console.error('Error:', error);
});

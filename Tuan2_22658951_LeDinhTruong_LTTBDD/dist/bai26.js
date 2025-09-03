"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Async function to simulate a 5-second wait using setTimeout
async function waitFiveSeconds() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, 5000);
    });
}
// Example usage
async function run() {
    console.log('Waiting 5 seconds...');
    await waitFiveSeconds();
    console.log('Done waiting!');
}
run();
//# sourceMappingURL=bai26.js.map
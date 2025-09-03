"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Function that simulates downloading a file in 3 seconds and logs when done
async function downloadFile(filename) {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(`Downloaded file: ${filename}`);
            resolve();
        }, 3000);
    });
}
// Example usage
downloadFile('example.txt');
//# sourceMappingURL=bai25.js.map
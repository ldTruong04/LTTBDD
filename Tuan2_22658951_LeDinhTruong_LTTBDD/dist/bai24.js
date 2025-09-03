"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Async function that sends a POST request to a test API
async function postData() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: 'foo',
                body: 'bar',
                userId: 1,
            }),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
    }
    catch (error) {
        console.error('POST error:', error);
    }
}
postData();
//# sourceMappingURL=bai24.js.map
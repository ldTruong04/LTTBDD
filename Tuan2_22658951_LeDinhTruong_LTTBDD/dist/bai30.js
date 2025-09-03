"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Async function to handle multiple API calls and display their success/failure status
async function handleMultipleApiCalls(ids) {
    const urls = ids.map(id => `https://jsonplaceholder.typicode.com/todos/${id}`);
    const fetchPromises = urls.map(url => fetch(url).then(res => {
        if (!res.ok)
            throw new Error(`Failed to fetch ${url}`);
        return res.json();
    }));
    const results = await Promise.allSettled(fetchPromises);
    results.forEach((result, idx) => {
        if (result.status === 'fulfilled') {
            console.log(`Success for ID ${ids[idx]}:`, result.value);
        }
        else {
            console.log(`Failure for ID ${ids[idx]}:`, result.reason);
        }
    });
}
handleMultipleApiCalls([1, 2, 9999]); // 9999 will likely fail
//# sourceMappingURL=bai30.js.map
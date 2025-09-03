"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Function that retries fetching a URL up to 'retries' times if the API call fails
async function fetchWithRetry(url, retries) {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Fetch failed with status ${response.status}`);
            }
            return await response.json();
        }
        catch (error) {
            if (attempt === retries) {
                throw new Error(`Failed after ${retries} attempts: ${error}`);
            }
            console.warn(`Attempt ${attempt} failed. Retrying...`);
        }
    }
}
// Example usage
fetchWithRetry('https://jsonplaceholder.typicode.com/todos/1', 3)
    .then(data => console.log('Fetched data:', data))
    .catch(error => console.error('Final error:', error));
//# sourceMappingURL=bai27.js.map
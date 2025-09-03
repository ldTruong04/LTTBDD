function simulateTask7(id: number, time: number): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Task ${id} done after ${time}ms`);
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
        console.log('First task completed:', result);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
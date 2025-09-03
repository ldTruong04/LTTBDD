const helloAsync = new Promise<string>((resolve) => {
	setTimeout(() => {
		resolve("Hello Async");
	}, 2000);
});

async function printHelloAsync() {
	const message = await helloAsync;
	console.log(message);
}

printHelloAsync();

// Simulate a task that resolves after ms milliseconds
function simulateTask(ms: number): Promise<string> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(`Task finished in ${ms}ms`);
		}, ms);
	});
}

// Async function that calls simulateTask(2000) and logs the result
async function runSimulatedTask() {
	const result = await simulateTask(2000);
	console.log(result);
}

runSimulatedTask();

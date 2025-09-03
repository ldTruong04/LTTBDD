function simulateTask(ms: number): Promise<string> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(`Nhiệm vụ hoàn thành trong ${ms}ms`);
		}, ms);
	});
}

async function runSimulatedTask() {
	const result = await simulateTask(2000);
	console.log(result);
}

runSimulatedTask();

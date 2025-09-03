function getNumberAsync(): Promise<number> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(10);
		}, 1000);
	});
}

getNumberAsync().then((num) => {
	console.log(num);
});

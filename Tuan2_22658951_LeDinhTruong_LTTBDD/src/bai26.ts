async function waitFiveSeconds(): Promise<void> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 5000);
  });
}

// Example usage
async function run() {
  console.log('thư lại...');
  await waitFiveSeconds();
  console.log('Đã xong chờ!');
}

run();

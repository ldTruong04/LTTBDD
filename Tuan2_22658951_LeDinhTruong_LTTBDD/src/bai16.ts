// Example async functions
async function asyncFunc1(): Promise<string> {
  return new Promise(resolve => {
    setTimeout(() => resolve('Result 1'), 1000);
  });
}

async function asyncFunc2(): Promise<string> {
  return new Promise(resolve => {
    setTimeout(() => resolve('Result 2'), 1000);
  });
}

async function asyncFunc3(): Promise<string> {
  return new Promise(resolve => {
    setTimeout(() => resolve('Result 3'), 1000);
  });
}
async function runInParallel() {
  const results = await Promise.all([
    asyncFunc1(),
    asyncFunc2(),
    asyncFunc3()
  ]);
  console.log(results); 
}

runInParallel();

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

async function runSequentially() {
  const res1 = await asyncFunc1();
  console.log(res1);
  const res2 = await asyncFunc2();
  console.log(res2);
  const res3 = await asyncFunc3();
  console.log(res3);
}

runSequentially();

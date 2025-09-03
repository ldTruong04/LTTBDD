function asyncTask(id: number): Promise<string> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`Task ${id} done`);
    }, 1000);
  });
}

async function queueProcess() {
  const ids = [1, 2, 3, 4, 5];
  for (const id of ids) {
    const result = await asyncTask(id);
    console.log(result);
  }
}

queueProcess();

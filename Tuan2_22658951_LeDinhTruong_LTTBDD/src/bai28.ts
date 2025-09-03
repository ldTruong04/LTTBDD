function asyncTask(id: number): Promise<string> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`Task ${id} done`);
    }, 1000 + id * 200); 
  });
}
async function batchProcess() {
  const tasks = [1, 2, 3, 4, 5].map(id => asyncTask(id));
  const results = await Promise.all(tasks);
  console.log(results);
}

batchProcess();

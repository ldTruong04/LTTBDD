async function tripleAfterDelay(num: number): Promise<number> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(num * 3);
    }, 1000);
  });
}

tripleAfterDelay(5).then(result => console.log(result)); // 15

const arr = [1, 2, 3, 4, 5, 6];

new Promise<number[]>((resolve) => {
  setTimeout(() => {
    resolve(arr);
  }, 1000);
})
  .then(numbers => numbers.filter(num => num % 2 === 0))
  .then(evens => console.log(evens)); // 2, 4, 6
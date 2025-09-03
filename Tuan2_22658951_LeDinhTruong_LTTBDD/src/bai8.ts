Promise.resolve(2)
  .then(num => num * num)      // 2 * 2 = 4
  .then(num => num * 2)        // 4 * 2 = 8
  .then(num => num + 5)        // 8 + 5 = 13
  .then(result => console.log(result)); // => 13
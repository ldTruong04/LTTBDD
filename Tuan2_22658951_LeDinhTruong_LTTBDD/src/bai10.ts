const promise = new Promise((resolve, reject) => {
  
  setTimeout(() => {
    
    resolve(123);
    
  }, 1000);
});

promise
  .then(result => console.log("kết quả:", result))
  .catch(error => console.error("Lỗi:", error))
  .finally(() => console.log("Hoàn thành"));
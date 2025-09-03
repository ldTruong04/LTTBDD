async function fetchTodo() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    if (!response.ok) {
      throw new Error('Phản hồi của mạng không ổn định');
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Lỗi Fetch:', error);
  }
}

fetchTodo();

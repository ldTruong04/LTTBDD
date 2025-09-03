async function fetchCompletedTodos() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const todos = await response.json();
    const completed = todos.filter((todo: { completed: boolean }) => todo.completed);
    console.log(completed);
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

fetchCompletedTodos();

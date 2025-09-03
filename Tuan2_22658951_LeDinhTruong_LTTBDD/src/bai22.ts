async function fetchMultipleTodos(ids: number[]) {
  for (const id of ids) {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }
}

fetchMultipleTodos([1, 2, 3]);

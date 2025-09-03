async function fetchWithRetry(url: string, retries: number): Promise<any> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Tải xuống không thành công với trạng thái ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      if (attempt === retries) {
        throw new Error(`Thất bại sau ${retries} lần thử: ${error}`);
      }
      console.warn(`Lần thử ${attempt} thất bại. Đang thử lại...`);
    }
  }
}

fetchWithRetry('https://jsonplaceholder.typicode.com/todos/1', 3)
  .then(data => console.log('Dữ liệu đã tải xuống:', data))
  .catch(error => console.error('Lỗi cuối:', error));

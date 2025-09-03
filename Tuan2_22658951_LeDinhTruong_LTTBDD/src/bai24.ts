async function postData() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: 'foo',
        body: 'bar',
        userId: 1,
      }),
    });
    if (!response.ok) {
      throw new Error('Phản hồi của mạng không ổn');
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('POST error:', error);
  }
}

postData();

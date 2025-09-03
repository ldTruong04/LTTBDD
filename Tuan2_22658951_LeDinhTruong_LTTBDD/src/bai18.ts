async function fetchUser(id: number): Promise<{ id: number; name: string }> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ id, name: `User${id}` });
    }, 1000);
  });
}

fetchUser(1).then(user => console.log(user));

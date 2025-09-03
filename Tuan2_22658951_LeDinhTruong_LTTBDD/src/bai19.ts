async function fetchUser(id: number): Promise<{ id: number; name: string }> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ id, name: `User${id}` });
    }, 1000);
  });
}
async function fetchUsers(ids: number[]): Promise<{ id: number; name: string }[]> {
  const userPromises = ids.map(id => fetchUser(id));
  return Promise.all(userPromises);
}

fetchUsers([1, 2, 3]).then(users => console.log(users));


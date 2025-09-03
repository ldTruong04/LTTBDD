"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function fetchUser(id) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({ id, name: `User${id}` });
        }, 1000);
    });
}
async function fetchUsers(ids) {
    const userPromises = ids.map(id => fetchUser(id));
    return Promise.all(userPromises);
}
fetchUsers([1, 2, 3]).then(users => console.log(users));
//# sourceMappingURL=bai19.js.map
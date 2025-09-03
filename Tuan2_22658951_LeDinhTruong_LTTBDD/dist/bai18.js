"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function fetchUser(id) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({ id, name: `User${id}` });
        }, 1000);
    });
}
fetchUser(1).then(user => console.log(user));
//# sourceMappingURL=bai18.js.map
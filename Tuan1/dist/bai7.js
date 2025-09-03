"use strict";
class User {
    constructor(name) {
        this._name = name;
    }
    get name() {
        return this._name;
    }
    set name(newName) {
        this._name = newName;
    }
}
const user = new User("Truong");
console.log(user.name);
user.name = "Truong1";
console.log(user.name);

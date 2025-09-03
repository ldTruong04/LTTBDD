"use strict";
class Account {
    constructor(username, password, accountId) {
        this.username = username;
        this.password = password;
        this.accountId = accountId;
    }
    checkPassword(pass) {
        return this.password === pass;
    }
}
const acc = new Account("user1", "pass123", 1001);
console.log(acc.username);
console.log(acc.accountId);
console.log(acc.checkPassword("pass123"));

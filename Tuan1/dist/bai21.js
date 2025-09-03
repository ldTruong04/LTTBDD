"use strict";
class Repository {
    constructor() {
        this.items = [];
    }
    add(item) {
        this.items.push(item);
    }
    getAll() {
        return this.items;
    }
}
const numberRepo = new Repository();
numberRepo.add(1);
numberRepo.add(2);
console.log(numberRepo.getAll()); // [1, 2]
const stringRepo = new Repository();
stringRepo.add("a");
stringRepo.add("b");
console.log(stringRepo.getAll()); // ["a", "b"]

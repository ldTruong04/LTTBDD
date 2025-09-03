"use strict";
class Book2 {
    constructor(title, author, year) {
        this.title = title;
        this.author = author;
        this.year = year;
    }
}
class User2 {
    constructor(name) {
        this.name = name;
    }
}
class Library {
    constructor() {
        this.books = [];
        this.users = [];
    }
    addBook(book) {
        this.books.push(book);
    }
    addUser(user) {
        this.users.push(user);
    }
}
const library = new Library();
library.addBook(new Book2("2000", "LeD Dinh Truong", 1950));
library.addUser(new User2("MeoCam"));
console.log(library.books);
console.log(library.users);

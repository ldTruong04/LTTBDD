"use strict";
class Book {
    constructor(title, author, year) {
        this.title = title;
        this.author = author;
        this.year = year;
    }
    getInfo() {
        return `Title: ${this.title}, Author: ${this.author}, Year: ${this.year}`;
    }
}
const book1 = new Book("Mua hoa nho", "Ha Anh Tho", 2025);
console.log(book1.getInfo());

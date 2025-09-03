
class Book {
    title: string;
    author: string;
    year: number;

    constructor(title: string, author: string, year: number) {
        this.title = title;
        this.author = author;
        this.year = year;
    }

    getInfo(): string {
        return `Tác pham: ${this.title}, Tac gia: ${this.author}, Nam: ${this.year}`;
    }
}

const book1 = new Book("Mua hoa nho", "Ha Anh Tho", 2025);
console.log(book1.getInfo());


class Book2 {
    title: string;
    author: string;
    year: number;

    constructor(title: string, author: string, year: number) {
        this.title = title;
        this.author = author;
        this.year = year;
    }
}

class User2 {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}

class Library {
    books: Book2[] = [];
    users: User2[] = [];

    addBook(book: Book2): void {
        this.books.push(book);
    }

    addUser(user: User2): void {
        this.users.push(user);
    }
}

const library = new Library();
library.addBook(new Book2("2000", "LeD Dinh Truong", 1950));
library.addUser(new User2("MeoCam"));
console.log(library.books);
console.log(library.users);
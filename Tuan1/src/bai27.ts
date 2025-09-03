class Person3 {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}

class Teacher extends Person3 {
    subject: string;

    constructor(name: string, subject: string) {
        super(name);
        this.subject = subject;
    }

    introduce(): void {
        console.log(`Hello, my name is ${this.name} and I teach ${this.subject}.`);
    }
}

const teacher = new Teacher("Mr. Truong", "Java");
teacher.introduce();
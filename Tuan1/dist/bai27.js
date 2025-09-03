"use strict";
class Person3 {
    constructor(name) {
        this.name = name;
    }
}
class Teacher extends Person3 {
    constructor(name, subject) {
        super(name);
        this.subject = subject;
    }
    introduce() {
        console.log(`Hello, my name is ${this.name} and I teach ${this.subject}.`);
    }
}
const teacher = new Teacher("Mr. Truong", "Java");
teacher.introduce();

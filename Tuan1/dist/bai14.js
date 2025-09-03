"use strict";
class Employee {
    constructor(name) {
        this.name = name;
    }
}
class Manager extends Employee {
    manageTeam() {
        console.log(`${this.name} Le.`);
    }
}
class Developer extends Employee {
    writeCode() {
        console.log(`${this.name} Dinh .`);
    }
}
const manager = new Manager("Truong1");
manager.manageTeam();
const developer = new Developer("Truong2");
developer.writeCode();

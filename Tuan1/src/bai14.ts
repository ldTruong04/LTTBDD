class Employee {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}

class Manager extends Employee {
    manageTeam(): void {
        console.log(`${this.name} Le.`);
    }
}

class Developer extends Employee {
    writeCode(): void {
        console.log(`${this.name} Dinh .`);
    }
}


const manager = new Manager("Truong1");
manager.manageTeam();

const developer = new Developer("Truong2");
developer.writeCode();
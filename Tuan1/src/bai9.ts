interface Animal {
    name: string;
    sound(): string;
}

class Dog implements Animal {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    sound(): string {
        return "gau gau!";
    }
}

const dog = new Dog("Milo");
console.log(`${dog.name} keu: ${dog.sound()}`);
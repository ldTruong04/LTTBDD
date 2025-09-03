"use strict";
class Dog {
    constructor(name) {
        this.name = name;
    }
    sound() {
        return "gau gau!";
    }
}
const dog = new Dog("Milo");
console.log(`${dog.name} keu: ${dog.sound()}`);

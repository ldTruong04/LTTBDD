class Animal {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}

class Dog2 extends Animal {
    bark(): string {
        return `${this.name} kêu: gau gau`;
    }
}

class Cat extends Animal {
    meow(): string {
        return `${this.name} kêu: Meow meow`;
    }
}

const dog2 = new Dog2("Milo");
console.log(dog2);

const cat = new Cat("mèo cam");
console.log(cat.meow());
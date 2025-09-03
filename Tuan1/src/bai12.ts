interface Flyable {
    fly(): void;
}

interface Swimmable {
    swim(): void;
}

class Bird implements Flyable {
    fly(): void {
        console.log("Bird is flying");
    }
}

class Fish implements Swimmable {
    swim(): void {
        console.log("Fish is swimming");
    }
}
const bird = new Bird();
bird.fly();

const fish = new Fish();
fish.swim();
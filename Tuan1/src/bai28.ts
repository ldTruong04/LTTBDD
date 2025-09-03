class Animal4 {
    protected makeSound(): void {
        console.log("tiếng kêu của động vật.");
    }

    public sound(): void {
        this.makeSound();
    }
}

class Dog4 extends Animal4 {
    protected makeSound(): void {
        console.log("Dog gau gau.");
    }
}

class Cat4 extends Animal4 {
    protected makeSound(): void {
        console.log("Cat meow meow.");
    }
}


const dog4 = new Dog4();
dog4.sound(); 

const cat4 = new Cat4();
cat4.sound(); 
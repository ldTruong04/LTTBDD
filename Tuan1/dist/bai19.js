"use strict";
class Animal3 {
    speak() {
        console.log("tiếng kêu của động vật.");
    }
}
class Dog3 extends Animal3 {
    speak() {
        console.log("Dog gau gau.");
    }
}
class Cat3 extends Animal3 {
    speak() {
        console.log("Cat meow meow.");
    }
}
const animals = [new Animal3(), new Dog3(), new Cat3()];
animals.forEach(animal => animal.speak());

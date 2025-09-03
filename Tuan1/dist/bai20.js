"use strict";
class Car2 {
    constructor(brand) {
        this.brand = brand;
    }
    drive() {
        console.log(`${this.brand} xe đang lái.`);
    }
}
class Bike2 {
    constructor(brand) {
        this.brand = brand;
    }
    drive() {
        console.log(`${this.brand} xe đang lái.`);
    }
}
const car2 = new Car2("Toyota");
car2.drive();
const bike2 = new Bike2("VinFast");
bike2.drive();

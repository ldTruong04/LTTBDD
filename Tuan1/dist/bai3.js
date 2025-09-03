"use strict";
class Car {
    constructor(brand, model, year) {
        this.brand = brand;
        this.model = model;
        this.year = year;
    }
    showInfo() {
        console.log(`Car Info: ${this.year} ${this.brand} ${this.model}`);
    }
}
const car1 = new Car("Vinfast", "vf9", 2022);
car1.showInfo();

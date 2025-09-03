"use strict";
class Rectangle {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    getArea() {
        return this.width * this.height;
    }
    getPerimeter() {
        return 2 * (this.width + this.height);
    }
}
const rect1 = new Rectangle(10, 5);
console.log("Chu vi:", rect1.getArea());
console.log("Dien tich:", rect1.getPerimeter());

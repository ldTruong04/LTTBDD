"use strict";
class Box {
    constructor(value) {
        this.value = value;
    }
    getValue() {
        return this.value;
    }
    setValue(newValue) {
        this.value = newValue;
    }
}
const numberBox = new Box(123);
console.log(numberBox.getValue());
const stringBox = new Box("Hello");
console.log(stringBox.getValue());

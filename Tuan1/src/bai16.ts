class Box<T> {
    private value: T;

    constructor(value: T) {
        this.value = value;
    }

    getValue(): T {
        return this.value;
    }

    setValue(newValue: T): void {
        this.value = newValue;
    }
}

const numberBox = new Box<number>(123);
console.log(numberBox.getValue()); 

const stringBox = new Box<string>("Hello");
console.log(stringBox.getValue()); 
interface Vehicle2 {
    brand: string;
    drive(): void;
}

class Car2 implements Vehicle2 {
    brand: string;

    constructor(brand: string) {
        this.brand = brand;
    }

    drive(): void {
        console.log(`${this.brand} oto đang lái.`);
    }
}

class Bike2 implements Vehicle2 {
    brand: string;

    constructor(brand: string) {
        this.brand = brand;
    }

    drive(): void {
        console.log(`${this.brand} xe đạp đang chay.`);
    }
}


const car2 = new Car2("VinFast");
car2.drive();

const bike2 = new Bike2("honda");
bike2.drive();
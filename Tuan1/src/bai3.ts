
class Car {
    brand: string;
    model: string;
    year: number;
  
    constructor(brand: string, model: string, year: number) {
      this.brand = brand;
      this.model = model;
      this.year = year;
    }
    showInfo(): void {
      console.log(`Car Info: ${this.year} ${this.brand} ${this.model}`);
    }
  }
  const car1 = new Car("Vinfast", "vf9", 2022);
  car1.showInfo(); 
  
 
class Rectangle {
    width: number;
    height: number;
  
    constructor(width: number, height: number) {
      this.width = width;
      this.height = height;
    }
    getArea(): number {
      return this.width * this.height;
    }
    getPerimeter(): number {
      return 2 * (this.width + this.height);
    }
  }
  const rect1 = new Rectangle(10, 5);
  console.log("Chu vi:", rect1.getArea());         
  console.log("Dien tich:", rect1.getPerimeter()); 
  
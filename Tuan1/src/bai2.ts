class Person {
    name: string;
    age: number;
  
    constructor(name: string, age: number) {
      this.name = name;
      this.age = age;
    }
  
    displayInfo(): void {
      console.log(`Name: ${this.name}, Age: ${this.age}`);
    }
  }
  
  class Student extends Person {
    grade: string;
  
    constructor(name: string, age: number, grade: string) {
      super(name, age); 
      this.grade = grade;
    }
  
    displayInfo(): void {
  
      console.log(`Name: ${this.name}, Age: ${this.age}, Grade: ${this.grade}`);
    }
  }
  const student1 = new Student("Truong", 20, "A");
  student1.displayInfo(); 

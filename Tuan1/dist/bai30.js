"use strict";
class Student3 {
    constructor(name) {
        this.name = name;
    }
}
class Teacher3 {
    constructor(name) {
        this.name = name;
    }
}
class School {
    constructor() {
        this.students = [];
        this.teachers = [];
    }
    addStudent(student) {
        this.students.push(student);
    }
    addTeacher(teacher) {
        this.teachers.push(teacher);
    }
    displayInfo() {
        console.log("Students:");
        this.students.forEach(s => console.log(`- ${s.name}`));
        console.log("Teachers:");
        this.teachers.forEach(t => console.log(`- ${t.name}`));
    }
}
const school = new School();
school.addStudent(new Student3("Truong1"));
school.addStudent(new Student3("Truong2"));
school.addTeacher(new Teacher3("Mr. Truong"));
school.addTeacher(new Teacher3("Ms. Truong"));
school.displayInfo();

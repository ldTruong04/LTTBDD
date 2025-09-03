class Student3 {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}

class Teacher3 {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}

class School {
    students: Student3[] = [];
    teachers: Teacher3[] = [];

    addStudent(student: Student3): void {
        this.students.push(student);
    }

    addTeacher(teacher: Teacher3): void {
        this.teachers.push(teacher);
    }

    displayInfo(): void {
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
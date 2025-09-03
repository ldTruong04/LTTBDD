class User {
    private _name: string;

    constructor(name: string) {
        this._name = name;
    }

    get name(): string {
        return this._name;
    }

    set name(newName: string) {
        this._name = newName;
    }
}

const user = new User("Truong");
console.log(user.name); 
user.name = "Truong1";
console.log(user.name); 
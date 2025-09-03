class Account {
    public username: string;
    private password: string;
    readonly accountId: number;

    constructor(username: string, password: string, accountId: number) {
        this.username = username;
        this.password = password;
        this.accountId = accountId;
    }

    checkPassword(pass: string): boolean {
        return this.password === pass;
    }
}

const acc = new Account("user1", "pass123", 1001);
console.log(acc.username);     
console.log(acc.accountId);    
console.log(acc.checkPassword("pass123")); 

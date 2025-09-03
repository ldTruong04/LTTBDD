class BankAccount {
  balance: number = 0;

  deposit(amount: number): void {
    this.balance += amount;
    console.log("Đã nạp:", amount);
  }

  withdraw(amount: number): void {
    if (amount <= this.balance) {
      this.balance -= amount;
      console.log("Đã rút:", amount);
    } else {
      console.log("Không đủ tiền!");
    }
  }
}

const account = new BankAccount();
account.deposit(10);   
account.withdraw(2);   
account.withdraw(9);   
console.log("Số dư:", account.balance); 

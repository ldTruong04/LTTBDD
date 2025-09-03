interface Payment {
    pay(amount: number): void;
}

class CashPayment implements Payment {
    pay(amount: number): void {
        console.log(`trả ${amount} tiền mặt.`);
    }
}

class CardPayment implements Payment {
    pay(amount: number): void {
        console.log(`trả ${amount} chuyển khoảng.`);
    }
}

const cash = new CashPayment();
cash.pay(100);

const card = new CardPayment();
card.pay(200);
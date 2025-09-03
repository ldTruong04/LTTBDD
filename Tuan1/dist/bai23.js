"use strict";
class CashPayment {
    pay(amount) {
        console.log(`trả ${amount} tiền mặt.`);
    }
}
class CardPayment {
    pay(amount) {
        console.log(`trả ${amount} chuyển khoảng.`);
    }
}
const cash = new CashPayment();
cash.pay(100);
const card = new CardPayment();
card.pay(200);

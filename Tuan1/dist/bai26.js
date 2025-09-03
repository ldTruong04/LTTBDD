"use strict";
class Product2 {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
}
class Order {
    constructor() {
        this.products = [];
    }
    addProduct(product) {
        this.products.push(product);
    }
    getTotalPrice() {
        return this.products.reduce((total, product) => total + product.price, 0);
    }
}
const order = new Order();
order.addProduct(new Product2("vf9", 50));
order.addProduct(new Product2("Mec", 10));
console.log(order.getTotalPrice()); // 60

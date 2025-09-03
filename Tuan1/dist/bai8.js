"use strict";
class Product {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
}
const products = [
    new Product("Macbook", 1200),
    new Product("Dell", 50),
    new Product("Asus", 150),
    new Product("Phone", 90),
];
const filteredProducts = products.filter(product => product.price > 100);
console.log("san pham giá  > 100:");
filteredProducts.forEach(product => {
    console.log(`${product.name}: $${product.price}`);
});

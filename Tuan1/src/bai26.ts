class Product2 {
    name: string;
    price: number;

    constructor(name: string, price: number) {
        this.name = name;
        this.price = price;
    }
}

class Order {
    products: Product2[] = [];

    addProduct(product: Product2): void {
        this.products.push(product);
    }

    getTotalPrice(): number {
        return this.products.reduce((total, product) => total + product.price, 0);
    }
}

const order = new Order();
order.addProduct(new Product2("vf9", 50));
order.addProduct(new Product2("Mec", 10));
console.log(order.getTotalPrice()); // 60
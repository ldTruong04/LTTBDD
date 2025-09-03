"use strict";
class MathUtil {
    static add(a, b) {
        return a + b;
    }
    static subtract(a, b) {
        return a - b;
    }
    static multiply(a, b) {
        return a * b;
    }
    static divide(a, b) {
        if (b === 0) {
            throw new Error("Khong the chia cho 0");
        }
        return a / b;
    }
}
console.log(MathUtil.add(5, 3)); // 8
console.log(MathUtil.subtract(5, 3)); // 2
console.log(MathUtil.multiply(5, 3)); // 15
console.log(MathUtil.divide(6, 2)); // 3

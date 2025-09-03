"use strict";
function getNumberAsync() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(10);
        }, 1000);
    });
}
getNumberAsync().then((num) => {
    console.log(num);
});

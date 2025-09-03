"use strict";
function rejectAfterOneSecond() {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject(new Error("Something went wrong"));
        }, 1000);
    });
}
rejectAfterOneSecond()
    .then(() => { })
    .catch((error) => {
    console.error(error.message);
});

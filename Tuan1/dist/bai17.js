"use strict";
class Logger {
    constructor() { }
    static getInstance() {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }
    log(message) {
        console.log(`[LOG]: ${message}`);
    }
}
const logger1 = Logger.getInstance();
logger1.log("Meo cam siu siu .");
const logger2 = Logger.getInstance();
console.log(logger1 === logger2);

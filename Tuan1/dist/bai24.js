"use strict";
class Appliance {
}
class Fan extends Appliance {
    turnOn() {
        console.log("Quạt đang bật.");
    }
}
class AirConditioner extends Appliance {
    turnOn() {
        console.log("Điều hoà đang bật.");
    }
}
const fan = new Fan();
fan.turnOn();
const ac = new AirConditioner();
ac.turnOn();

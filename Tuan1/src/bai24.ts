abstract class Appliance {
    abstract turnOn(): void;
}

class Fan extends Appliance {
    turnOn(): void {
        console.log("Quạt đang bật.");
    }
}

class AirConditioner extends Appliance {
    turnOn(): void {
        console.log("Điều hoà đang bật.");
    }
}

const fan = new Fan();
fan.turnOn();

const ac = new AirConditioner();
ac.turnOn();
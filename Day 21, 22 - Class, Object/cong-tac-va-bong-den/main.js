class ElectricLamp {
    constructor(){
        this.status = false;
    }

    turnOff(){
        this.status = false;
        console.log("Đèn tắt!");
    }

    turnOn(){
        this.status = true;
        console.log("Đèn sáng!");
    }
};
class SwitchButton {
    constructor(status = false, lamp){
        this.status = status;
        this.lamp = lamp;
    }

    connectToLamp(lamp){
        this.lamp = lamp;
    }

    switchOn(){
        this.status = true;
        this.lamp.turnOn();
    }
    switchOff(){
        this.status = false;
        this.lamp.turnOff();
    }
};

let denBan = new ElectricLamp();
let congTac = new SwitchButton();
console.log(congTac);
congTac.connectToLamp(denBan);
console.log(congTac);
for(let i = 0; i < 10; i++) {
    congTac.switchOn();
    congTac.switchOff();
}
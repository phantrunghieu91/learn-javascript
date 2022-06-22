class Animal {
    constructor(name, weight, speed) {
        this.name = name;
        this.weight = weight;
        this.speed = speed;
    }

    getName(){
        return this.name;
    }
    getWeight(){
        return this.weight;
    }
    getSpeed(){
        return this.speed;
    }

    setName(name){
        this.name = name;
    }
    setWeight(weight){
        this.weight = weight;
    }
    setSpeed(speed){
        this.speed = speed;
    }

    speak(){
        console.log(`${this.name} tạo tiếng động`);
    }
};

class Rat extends Animal {
    constructor(name, weight, speed, status) {
        super(name, weight, speed);
        this.status = status;
    }
    getStatus(){
        return this.status == true ? "Sống" : "Chết";
    }

    setStatus(status) {
        this.status = status;
    }

    speak(){
        super.speak();
        console.log(`${this.name} kêu chít chít!`);
    }
};

class Cat extends Animal {
    speak(){
        super.speak();
        console.log(`${this.name} kêu meo meo!`)
    }

    catchRat(rat) {
        if(rat.getStatus() == true) {
            if(this.speed > rat.getSpeed()) {
                console.log(`${this.name} có thể bắt được ${rat.getName()}`);
            } else {
                console.log(`${this.name} không thể bắt được ${rat.getName()}`);
            }
        } else {
            console.log(`${rat.getName()} không thể ăn được!`);
        }
    }

    eatRat(rat) {
        if(this.getSpeed() > rat.getSpeed()){
            if(rat.getStatus() == "Sống") {
                console.log(`${rat.getName()} có thể ăn được!`);
                this.weight += rat.getWeight();
            } else {
                console.log(`${rat.getName()} không thể ăn được!`);
            }
        } else {
            console.log(`${this.getName()} không đuổi kịp ${rat.getName()}`);
        }
    }
};

let jerry = new Rat("Jerry", 3, 10, true);
jerry.speak();
let tom = new Cat("Tom", 20, 8);
tom.speak();
tom.catchRat(jerry);
console.log(`Trọng lượng của ${tom.getName()} trước khi ăn ${jerry.getName()}: ${tom.getWeight()}`);
tom.eatRat(jerry);
console.log(`Trọng lượng của ${tom.getName()} sau khi ăn ${jerry.getName()}: ${tom.getWeight()}`);
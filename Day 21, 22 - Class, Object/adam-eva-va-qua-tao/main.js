class Apple {
    constructor(weight = 10){
        this.weight = weight;
    }

    getWeight(){
        return this.weight;
    }

    isEmpty(){
        return this.weight == 0;
    }

    decrease(){
        this.weight--;
    }
};

class Human {
    constructor(name, isMale = true, weight = 40){
        this.name = name;
        this.isMale = isMale;
        this.weight = weight;
    }

    getName(){
        return this.name;
    }
    getGender(){
        return this.isMale ? "Male" : "Female";
    }
    getWeight(){
        return this.weight;
    }

    setName(name){
        this.name = name;
    }
    setGender(isMale){
        this.isMale = isMale;
    }
    setWeight(weight){
        this.weight = weight;
    }

    say(str){
        console.log(`${this.name} said: ${str}`);
    }
    checkApple(apple){
        return !apple.isEmpty();
    }
    eatApple(apple){
        if(!apple.isEmpty()){
            apple.decrease();
            this.weight++;
        }
    }

}

let tao = new Apple();
let adam = new Human("Adam", true);
console.log(adam, tao);
console.log(adam.checkApple(tao));
while(adam.checkApple(tao)){
    adam.eatApple(tao);    
    console.log(adam, tao);
}
if(tao.getWeight() == 0) adam.say("Ăn hết táo rồi!");
else adam.say("Hmm!");